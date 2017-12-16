import * as load from "../../action/index/Action"

const initialState:boolean = false;

/*控制请求模态层*/
export function reducer(state = initialState, action: load.Actions) {
  switch (action.type) {
    case load.SHOW_LOADING: {
      console.log("执行");
      return true
    }
    case load.HIDE_LOADING: {
      return false;
    }
    default: {
      return state;
    }
  }
}

