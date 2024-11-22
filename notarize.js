const {notarize} = require('@electron/notarize')

exports.default = async function notarizing (context) {
  const appName = context.packager.appInfo.productFilename
  const {electronPlatformName, appOutDir} = context
  if (electronPlatformName !== 'darwin') {
    return
  }
  // 获取xxx.app 路径
  let appPath = `${appOutDir}/${appName}.app`
  // 您的苹果开发者帐户的用户名
  let appleId = "xxxx@gmail.com"

// 应用程序专用密码，每次打包之前需要重新生成,公证完成密码即失效
  let appleIdPassword = "wryw-zbbp-yjte-wfhc" 
  // 您要公证的团队ID
  let teamId = "xxxxx"
  console.log("appPath ",appPath)

  // Package your app here, and code sign with hardened runtime
  // 指定公证工具为notarytool
  return  await notarize({ tool: 'notarytool',
    appPath,
    appleId,
    appleIdPassword,
    teamId
  });
}