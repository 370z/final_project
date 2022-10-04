import _Axios from './_Axios'

const session = async () => {
  let result = await AxiosControl.get(`/session`)
  return result ? result.data : result
}

const exports = {
    session,
}
export default exports;