import { Placement, isStr, isFn, isUndefined } from "../shared/utils"
import {HostComponent, HostText, FunctionComponent, ClassComponent, Fragment} from "./ReactWorkTags"

const createFiber = (vnode, returnFiber) => {
    const fiber = {
        // fiber 类型
        type: vnode.type,
        // key
        key: vnode.key,
        // props
        props: vnode.props,
        // 存放当前 fiber 对象的DOM节点
        stateNode: null,
        // 父 fiber
        return: returnFiber,
        // 子 fiber
        child: null,
        // 兄弟 fiber
        sibling: null,
        // 存储旧的 fiber 对象
        alternate: null,
        // 该fiber 所要做的具体操作
        flags: Placement,
       // 记录当前节点在当前层级的位置
        index: null,
    };

    const type = vnode.type;

    if(isStr(type)) {
        fiber.tag = HostComponent;
    } else if(isFn(type)) {
        // 此时会有两种情况，由于 class 组件和函数组件的type 都是 function
        // 所以需要 通过判断 type 是否有 isReactComponent 来判断
        if(type.prototype.isReactComponent) {
            // 类组件
            fiber.tag = ClassComponent;
        } else {
            // 函数组件
            fiber.tag = FunctionComponent;
        }
    } else if(isUndefined(type)) {
        // 说明是一个文本节点
        fiber.tag = HostText;

        fiber.props = {
            children: vnode
        }
    } else {
        fiber.tag = Fragment;
    }
   
    return fiber;
}

export default createFiber;