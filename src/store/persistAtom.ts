import { atom as jotaiAtom } from 'jotai'

// 存储所有通过pAtom创建的原子
const atomCollection = new Set()

// pAtom函数的类型签名与jotai的atom相同
function pAtom<Value>(initialValue: Value) {
  // 使用jotai的atom创建一个新的原子
  const newAtom = jotaiAtom(initialValue)

  // 将新的原子添加到集合中
  atomCollection.add(newAtom)

  // 返回新创建的原子
  return newAtom
}

// 获取所有通过pAtom创建的原子的列表
export function getAllAtoms() {
  return Array.from(atomCollection)
}

// 导出自定义的pAtom函数
export default pAtom
