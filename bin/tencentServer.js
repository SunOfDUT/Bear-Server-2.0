const  tencentcloud = require('tencentcloud-sdk-nodejs');

const smsClient = tencentcloud.sms.v20210111.Client

var dbOp = require('./opeartion/Userdbopeation')

const client = new smsClient({
    credential:{
        secretId:"AKIDGMFxRgicIjurXy97sbGhwxtVvKemiSzI",
        secretKey:"CAuRmskOQEoBLI0VlphLkBON7ez74ugF"
    },
    region:"ap-guangzhou",
    profile:{
        signMethod:"HmacSHA256",
        httpProfile:{
            reqMethod:"POST",
            reqTimeout:30,
            endpoint:"sms.tencentcloudapi.com"
        }
    }
})

// 随机生成6位数字
const getVerCode = () =>  {
    let verCode = Math.floor((Math.random()*1000000)+1);
    if (verCode < 100000) {
        return getVerCode();
    }
    return verCode.toString();
}

const SignInparams = {
    SmsSdkAppId: "1400764121",
    SignName: "LogStudyApp",
    TemplateId: "1627677",
    TemplateParamSet: [],
    PhoneNumberSet: [],
    SessionContext: "",
    ExtendCode: "",
    SenderId: "",
}

const SignUpparams ={
    SmsSdkAppId: "1400764121",
    SignName: "LogStudyApp",
    TemplateId: "1627679",
    TemplateParamSet: [],
    PhoneNumberSet: [],
    SessionContext: "",
    ExtendCode: "",
    SenderId: "",
}

const ReSetpasswordParams ={
    SmsSdkAppId: "1400764121",
    SignName: "LogStudyApp",
    TemplateId: "1627680",
    TemplateParamSet: [],
    PhoneNumberSet: [],
    SessionContext: "",
    ExtendCode: "",
    SenderId: "",
}

function SignInsendMessage(PhoneNumber,res){
      var SixCode = getVerCode()
      SignInparams.TemplateParamSet = [SixCode];
      SignInparams.PhoneNumberSet = ['+86' + PhoneNumber];
      client.SendSms(SignInparams,function(err,messageRes){
          if(err){
              console.log(err)
              res.json({
                'status':'faliure',
                'msg':'验证码发送失败'
              })
              res.end()
              return
          }
          if(messageRes.SendStatusSet[0].Code == "InvalidParameterValue.IncorrectPhoneNumber"){
            res.json({
                'status':'faliure',
                'msg':'手机号不正确'
              })
              res.end()
          }else if(messageRes.SendStatusSet[0].Code == "Ok"){
            res.json({
                'status':'SignIn',
                'msg':SixCode
              })
              res.end()
          }else{
            res.json({
                'status':'faliure',
                'msg':'验证码发送频繁,请稍后再试'
              })
              res.end()
          }
          console.log(messageRes)
      })
}

function SignUpsendMessage(PhoneNumber,res){
    var SixCode = getVerCode()
    SignUpparams.TemplateParamSet = [SixCode];
    SignUpparams.PhoneNumberSet = ['+86' + PhoneNumber];
    client.SendSms(SignUpparams,function(err,messageRes){
        if(err){
            console.log(err)
            res.json({
              'status':'faliure',
              'msg':'验证码发送失败'
            })
            res.end()
            return
        }
        if(messageRes.SendStatusSet[0].Code == "InvalidParameterValue.IncorrectPhoneNumber"){
          res.json({
              'status':'faliure',
              'msg':'手机号不正确'
            })
            res.end()
        }else if(messageRes.SendStatusSet[0].Code == "Ok"){
          res.json({
              'status':'SignUp',
              'msg':SixCode
            })
            res.end()
        }else{
          res.json({
              'status':'faliure',
              'msg':'验证码发送频繁,请稍后再试'
            })
            res.end()
        }
        console.log(messageRes)
    })
} 


function ReSetsendMessage(PhoneNumber,res){
    var SixCode = getVerCode()
    ReSetpasswordParams.TemplateParamSet = [SixCode];
    ReSetpasswordParams.PhoneNumberSet = ['+86' + PhoneNumber];
    client.SendSms(ReSetpasswordParams,function(err,messageRes){
        if(err){
            console.log(err)
            res.json({
              'status':'failure',
              'msg':'验证码发送失败'
            })
            res.end()
            return
        }
        res.json({
          'status':'success',
          'msg':SixCode,
        })
        res.end()
        console.log(messageRes)
    })
} 

  module.exports = {
      SignInsendMessage,
      SignUpsendMessage,
      ReSetsendMessage,
      getVerCode,
  };