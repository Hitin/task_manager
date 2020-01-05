import axios from 'axios'

export function authenticityToken () {
  const token = document.querySelector('meta[name="csrf-token"]')
  return token ? token.content : null
}

function headers () {
  return {
    Accept: '*/*',
    'content-Type': 'application/json',
    'X-CSRF-Token': authenticityToken(),
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export function fetch (method, url, body) {
  const options = {
    method,
    headers: headers(),
    data: body,
    url
  }
  return axios(options)
}