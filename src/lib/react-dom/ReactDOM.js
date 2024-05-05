import createFiber from "../reconciler/ReactFiber";
import scheduleUpdateOnFiber from "../reconciler/ReactFiberWorkLoop";

/**
 * 更新容器
 * @param {*} element  要挂载的 vnode 树
 * @param {*} container  容器的 DOM 节点
 */
const updateContainer = (element, container) => {
    const fiber = createFiber(element, {
        // 该对象就是 父fiber 对象， 会放置一些核心的属性
        type: container.nodeName.toLowerCase(),
        stateNode: container,
    })

    scheduleUpdateOnFiber(fiber)
}

class ReactDOMRoot {
    constructor(container) {

        // 将拿到的 根Dom节点在内部保存一份
        this._internalRoot = container
    }

    /**
     * 
     * @param {*} children 要挂在到根节点的 vnode 树
     */
    render(children) {
        console.log(children);
        updateContainer(children, this._internalRoot)
    }
}


const ReactDOM = {

    /**
     * 
     * @param {*} container 根节点
     * @returns  返回一个 ReactDOMRoot 对象
     */
    createRoot(container) {
        return new ReactDOMRoot(container)
    }
}

export default ReactDOM;