/**
 * 移动端表单验证
 * 依赖：jquery、layer-mobile
 * @type {{init: (function(*=): boolean), check: vancens_verify_mobile.check, layer: vancens_verify_mobile.layer}}
 */
let vancens_verify_mobile       = {

    /**
     * 初始化，对外暴露的方法
     * @param dom
     * @returns {boolean}
     */
    init:function (dom) {
        let self = this;
        let ret_state = true;
        $(dom).find("[data-verify]").each(function () {
            let value = $(this).val();
            let verify_name = $(this).attr('data-verify');
            let error_msg = $(this).attr('data-verifymsg') ? $(this).attr('data-verifymsg'):'请填写正确信息';
            ret_state =  self.check(value,verify_name,error_msg);
            if (!ret_state){
                $(this).focus();
                return false;
            }
        })
        return ret_state;
    },

    /**
     * 检测验证
     * @param value         值
     * @param verify_name   类型
     * @param error_msg     错误提示信息
     * @returns {boolean}
     */
    check:function (value,verify_name,error_msg) {
        let self = this;
        switch (verify_name) {
            case 'require':
                if (!value){
                    self.layer(error_msg);
                    return false;
                }
                break;
            case 'phone':
                let reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!reg.test(value)) {
                    self.layer(error_msg);
                    return false;
                }
                break;
        }
        return true;
    },

    /**
     * 使用layer-mobile提示插件
     * @param msg
     */
    layer:function (msg) {
        layer.open({
            content: msg
            ,skin: 'msg'
            ,time: 2
        });
    },

    /**
     * 序列化表单数据，用于ajax post提交
     * @param dom
     */
    getObjData:function(dom){
        let value = $(dom).serializeArray();
        let ret_obj = {}
        $.each(value,function (i,n) {
            let na = n.name
            ret_obj[na] = n.value;
        })
        return ret_obj;

    }
};