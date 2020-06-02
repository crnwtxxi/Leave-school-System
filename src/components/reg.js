//设置密码
var setPass = (rule, value, callback) => {
    var inputPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (!value) {
        return callback(new Error('不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('密码至少包含 数字和英文，长度6-20，请重新输入'));
        } else {
            callback();
        }
    }, 1000);
};

var checkUsername = (rule, value, callback) => {
    var inputPattern = /^\d{10}$/;
    if (!value) {
        return callback(new Error('学号不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的学号'));
        } else {
            callback();
        }
    }, 1000);
};

var checkName = (rule, value, callback) => {
    var inputPattern = /[\u4e00-\u9fa5]{2,6}/
     setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的名字'));
        } else {
            callback();
        }         
    }, 500);
};

var checkLocation = (rule, value, callback) => {
    var inputPattern = /^\d{1}-\d{3}$/
     setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的寝室号'));
        } else {
            callback();
        }         
    }, 100);
};

var checkRemark = (rule, value, callback) => {
    var inputPattern = /[\u4e00-\u9fa5]{1,10}/
     setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入10个以内的中文字符'));
        } else {
            callback();
        }         
    }, 100);
};

var checkChinese = (rule, value, callback) => {
    var inputPattern = /[\u4e00-\u9fa5]/;
    if(!value) {
        callback();
    } else {
        setTimeout(() => {
            if (!inputPattern.test(value)) {
                callback(new Error('请正确输入,只能输入中文'));
            } else {
                callback();
            }
        }, 1000);
    }
};

var checkCost = (rule, value, callback) => {
    var inputPattern = /^-?(([0-9]*(\.[0-9]{1,2})$)|([0-9]+$))/;
    if (!value) {
        return callback(new Error('费用不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的数字'));
        } else {
            callback();
        }
    }, 1000);
};

var checkCardid = (rule, value, callback) => {
    var inputPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!value) {
        return callback(new Error('身份证不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    }, 1000);
};

var checkClass = (rule, value, callback) => {
    var inputPattern = /^\d{1,2}$/;
    if (!value) {
        return callback(new Error('班级不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请输入正确的数字，长度为1-2'));
        } else {
            callback();
        }
    }, 1000);
};

var checkDigal = (rule, value, callback) => {
    var inputPattern = /^\d*\.?\d+$/;
    if (!value) {
        return callback(new Error('不能为空'));
    }
    setTimeout(() => {
        if (!inputPattern.test(value)) {
            callback(new Error('请正确输入,只能输入数字'));
        } else {
            callback();
        }
    }, 1000);
};

export  {
    setPass,
    checkUsername,
    checkName,
    checkLocation,
    checkRemark,
    checkChinese,
    checkCost,
    checkCardid,
    checkClass,
    checkDigal
}
//import {checkUsername} from '../../components/reg.js'