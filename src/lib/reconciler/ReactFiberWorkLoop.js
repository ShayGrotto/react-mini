import beginWork from "./ReactFiberBeginWork";
import completeWork from "./ReactFiberCompleteWork";

//保存当前正在进行工作的 fiber 对象
let wip = null;

//保存当前根节点的 fiber 对象
let wipRoot = null;

function scheduleUpdateOnFiber(fiber) {
    wip = fiber;
    wipRoot = fiber;

    // 当浏览器每一帧都有空闲时，就会运行 workLoop
    requestIdleCallback(workLoop);

}

function workloop(deadline) {
    while(wip && deadline.timeRemaining() > 0) {
        // 进入此循环，说明当前有需要处理的 并且有时间处理的 fiber 节点
        performUnitOfWork();
    }

    // 没有时间 或者是 fiber 树都处理完了
    if(!wip) {
        // 整个 fiber 树都处理完了，将 wipRoot 提交到 DOM 节点上
        commitRoot()
    }
}

// 该函数负责处理一个 fiber 节点
// 处理当前 fiber 对象
// 深度优先遍历子节点，生成子节点的 fiber 对象
function performUnitOfWork() {
    beginWork(wio);

    if(wip.child) {
        wip = wip.child;
        return;
    }

    completeWork(wip)

    // 没有子节点，则寻找兄弟节点
    let next = wip;
    while(next) {
        if(next.sibling) {
            wip = next.sibling;
            return;
        }

        // 如果没有进入上面的if,说明当前节点已经没有兄弟节点，
        // 则将当前节点的父节点设置为当前的工作节点
        next = next.return;

        // 在寻找父亲节点的兄弟节点之前，先执行一遍 completeWork 方法
        completeWork(next)
    }

    // 到这里，说明整个 fiber 树都处理完了
    wip = null;
}

function commitRoot() {

}

export default scheduleUpdateOnFiber;