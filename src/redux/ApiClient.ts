import fetch from 'isomorphic-unfetch'

import { IRequestParams, IRequest } from '../interface/request.type'

enum EHttpError {
  forbidden = 403,
  client_has_closed_connection = 499
}

const ERROR_CODE = {
  BAD_USER_TOKEN: 20001
}

const methods = ['get', 'post', 'put', 'patch', 'del']

function assertUserToken(userToken: any) {
  if (userToken && userToken.utoken && userToken.expire * 1000 > Date.now()) {
    return userToken.utoken
  }

  return null
}

function normalizedQuery(payload: any) {
  const utoken = assertUserToken(payload.userToken)
  const query = {
    utoken: utoken || '',
    user_source: 1,
    ...payload
  }

  if (payload.img_type && payload.img_type !== 'daily') {
    delete query.img_type
  }
  return query
}

function httpBuildQuery(data: any) {
  const params = normalizedQuery(data)
  const fmtData = Object.keys(params).reduce((prevVal, currVal) => {
    const dataStr = [currVal, '=', encodeURIComponent(params[currVal]), '&'].join('')

    return prevVal + dataStr
  }, '')

  return fmtData.substring(0, fmtData.length - 1)
}

class ApiClient {
  static buildFormData(data: any) {
    const formData = new FormData()

    Object.keys(data).forEach((name) => formData.append(name, data[name]))

    return formData
  }

  static sendFetchRequest(url: string, method: string, params: any, data: any, form: any) {
    const reqParams: IRequestParams = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let path = url

    if (form) {
      reqParams.body = ApiClient.buildFormData(normalizedQuery(form))
    } else if (data) {
      reqParams.body = JSON.stringify(normalizedQuery(data))
    } else {
      path = `${path}?${httpBuildQuery(params || {})}`
    }

    return fetch(path, reqParams)
  }

  constructor() {
    methods.forEach((method) => {
      this[method] = (url: string, { params, data, form }: IRequest = {}) =>
        new Promise((resolve, reject) => {
          const request = ApiClient.sendFetchRequest(url, method, params, data, form)

          // hook all HTTP response.
          request
            .then((response) => {
              if (response.status === EHttpError.forbidden) {
                throw new Error('403')
              }
              if (response.status >= EHttpError.client_has_closed_connection) {
                return reject(response.status)
              }

              return response.json()
            })
            .then((body) => {
              if (body && body.error && body.error.error_code) {
                // bad user token
                if (+body.error_code === ERROR_CODE.BAD_USER_TOKEN) {
                  throw new Error('403')
                } else {
                  console.error('请求失败', url, body.error.error_detail)
                }
                return reject(body)
              }

              delete body.error
              return resolve(body)
            })
            .catch((err) => {
              console.log('catched fetch', err)
              reject(err || data || form)
            })
        })
    })
  }
}

export { httpBuildQuery, normalizedQuery }

export default ApiClient
