use wasm_bindgen::prelude::*;
use js_sys::Promise;
use hyper::Client

async fn speak(text: String, language:String) -> Result<JsValue, JsValue> {
    
    Ok(JsValue::UNDEFINED)
}

#[wasm_bindgen]
pub async fn speak_js(text: String, language:String) -> Promise {
    use wasm_bindgen_futures::future_to_promise;

    future_to_promise(async move {
        speak(text, language).await
    })
}