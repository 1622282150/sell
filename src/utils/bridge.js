// function setupWebViewJavascriptBridge (callback)
// {
// 	if (window.WebViewJavascriptBridge)
// 	{ return callback(window.WebViewJavascriptBridge) } if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
// 	window.WVJBCallbacks = [callback]
// 	let WVJBIframe = document.createElement('iframe')
// 	WVJBIframe.style.display = 'none'
// 	WVJBIframe.src = 'https://__bridge_loaded__'
// 	document.documentElement.appendChild(WVJBIframe)
// 	setTimeout(() => { document.documentElement.removeChild(WVJBIframe) }, 0)
// }
// setupWebViewJavascriptBridge(function(bridge) {
//     // js注册方法给ObjC调用
//     bridge.registerHandler('jsHandlerName', function(data, responseCallback) {
//         // data为ObjC传递给JS的数据
//         console.log("JS Echo called with:", data)
//         // js返回数据给Objc
//         responseCallback('返回一个字符串，告诉ObjC：我已收到数据data')
//     })

//     // js调用ObjC注册的方法
//     var params = {'key':'value'} // 发送给ObjC的数据
//     bridge.callHandler('ObjCHandlerName', params , function responseCallback(responseData) {
//         // responseData ObjC返回的数据
//         console.log("JS received response:", responseData)
//     })
// })
// export default {
// 	callhandler (name, data, callback)
// 	{ setupWebViewJavascriptBridge(function (bridge) { bridge.callHandler(name, data, callback) }) },
// 	registerhandler (name, callback) {
// 		setupWebViewJavascriptBridge(function (bridge)
// 		{ bridge.registerHandler(name, function (data, responseCallback) { callback(data, responseCallback) }) })
// 	}
// }
function setupWebViewJavascriptBridge (callback) {

	if (window.WebViewJavascriptBridge) {

		return callback(window.WebViewJavascriptBridge)
	}

	if (window.WVJBCallbacks) {

		return window.WVJBCallbacks.push(callback)
	}

	window.WVJBCallbacks = [callback]

	let WVJBIframe = document.createElement('iframe')

	WVJBIframe.style.display = 'none'

	WVJBIframe.src = 'https://__bridge_loaded__'
	document.documentElement.appendChild(WVJBIframe)

	setTimeout(() => {

		document.documentElement.removeChild(WVJBIframe)
	}, 0)

}

export default {

	callhandler (name, data, callback) {

		setupWebViewJavascriptBridge(function (bridge) {

			bridge.callHandler(name, data, callback)
		})

	},

	registerhandler (name, callback) {

		setupWebViewJavascriptBridge(function (bridge) {

			bridge.registerHandler(name, function (data, responseCallback) {

				callback(data, responseCallback)

			})

		})

	}

}


