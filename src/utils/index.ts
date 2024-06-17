export const showProxyInfo = <T extends object>(data: T) => {
  const res = JSON.parse(JSON.stringify(data))
  console.log(res)
  return res
}

export * as dom2pdf from './dom2pdf.ts'
