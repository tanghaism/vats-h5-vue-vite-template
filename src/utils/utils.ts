// 读取文件
export function scanFiles(ctx: any, fileExt = 'ts', returnType: 'object' | 'array' = 'object') {
  const reg = new RegExp('\\.' + fileExt + '$', 'gim');
  if (returnType === 'object') {
    const map: any = {};
    for (const key of ctx.keys()) {
      const keyArr = key.split('/');
      keyArr.shift(); // 移除.
      map[keyArr.join('.').replace(reg, '')] = ctx(key).default as never;
    }
    return map;
  } else if (returnType === 'array') {
    const map: any = [];
    for (const key of ctx.keys()) {
      map.push(...ctx(key).default);
    }
    return map;
  }
}

// 创建web worker
// @param func: web worker需要执行的函数
// @param data: 传递给web worker的参数
// @param backUpFunc: 如果浏览器不支持web worker的兼容方案，一般不用传入
export function createWorker(
  func: () => void,
  data: unknown,
  backUpFunc?: (data: unknown) => any,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    if (window.Worker) {
      const blob = new Blob(['(' + func.toString() + ')()']);
      const url = window.URL.createObjectURL(blob);
      const worker = new Worker(url);
      worker.postMessage(data);
      worker.onmessage = ({ data }) => {
        worker.terminate();
        resolve(data);
      };

      worker.onerror = e => {
        worker.terminate();
        reject(e.message);
      };

      worker.onmessageerror = e => {
        worker.terminate();
        reject(e);
      };
    } else {
      return backUpFunc && backUpFunc(data);
    }
  });
}

// 动态引入script
// @param link: script的src地址
// @param id: script的唯一标示，用于避免重复引用
export function asyncLoadSource(
  link: string,
  id: string,
  type: 'text/javascript' | 'text/css' = 'text/javascript',
) {
  return new Promise((resolve, reject) => {
    if (!id) return reject('请设置资源ID');
    if (document.querySelector(`#${id}`)) {
      return resolve('');
    }

    let dom;
    if (type === 'text/javascript') {
      // 创建script标签，引入外部文件
      dom = document.createElement('script') as HTMLScriptElement;
      dom.type = type;
      dom.src = link;
      dom.id = id;
    } else if (type === 'text/css') {
      // 创建link标签，引入外部文件
      dom = document.createElement('link') as HTMLLinkElement;
      dom.type = type;
      dom.href = link;
      dom.id = id;
      dom.rel = 'stylesheet';
    }

    document.getElementsByTagName('head')[0].appendChild(dom as HTMLElement);
    // 引入成功
    (dom as HTMLElement).onload = function () {
      resolve('');
    };
    // 引入失败
    (dom as HTMLElement).onerror = function () {
      reject('引入失败');
    };
  });
}

// 一键复制
// @param content: 需要复制的内容
// @param container: 复制对象所在的dom树，如果为异步弹框，请传入异步弹框的dom
export function copy(
  content: string,
  container: HTMLElement = document.querySelector('body') as HTMLElement,
): boolean {
  if (!document.queryCommandSupported('copy')) {
    // 不支持
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = content;
  container.appendChild(textarea);
  textarea.select(); // 选择对象
  textarea.setSelectionRange(0, content.length); // 核心
  const result = document.execCommand('copy'); // 执行浏览器复制命令
  textarea.remove();
  return result;
}
