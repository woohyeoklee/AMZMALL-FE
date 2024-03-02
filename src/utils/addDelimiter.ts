function addDelimiter(value: number | string, delimiter = ',') {
  if (value === undefined) {
    // value가 undefined일 때 기본값이나 오류 처리
    return ''
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
