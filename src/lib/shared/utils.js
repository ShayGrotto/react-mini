

// 对 fiber 要做的操作进行标记

// 没有任何操作
export const NoFlags = 0b00000000000000000000;
// 节点新增、插入、移动
export const Placement = 0b0000000000000000000010; // 2
// 节点更新属性
export const Update = 0b0000000000000000000100; // 4
// 删除节点
export const Deletion = 0b0000000000000000001000; // 8


/**
 * 判断s是否是字符串
 * @param {*} s 
 * @returns 
 */
export function isStr(s) {
    return typeof s === "string"
}

/**
 * 判断fn是否是函数
 * @param {*} fn 
 * @returns         
 */
export function isFn(fn) {
    return typeof fn === "function"
}


/**
 * 判断s是否是undefined
 * @param {*} s 
 * @returns 
 */
export function isUndefined(s) {
    return s === undefined
}