/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'} 

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': (options) => {
      if (options.body) {
        const user = JSON.parse(options.body);
        if (user.userName === 'admin' && user.password === 'admin') {
          return toSuccess(mock({
            'userName': 'admin',                // 用户名
            'name': '@cname',                   // 中文名称
            'age|1-100': 100,                   // 100以内随机整数
            'birthday': '@date("yyyy-MM-dd")',  // 日期
            'city': '@city(true)',              // 中国城市
            'phone': /^1[385][1-9]\d{8}/,       // 手机号
            'token': '@guid'                    // token
          }), 400);
        } else {
          return toError('用户名或密码错误 admin/admin');
        }
      } else {
        return toError('请输入用户名和密码');
      }
    },
    '/api/user/register': options => toSuccess(),
    '/api/user/menu': options => toSuccess([
      {
        name: '库存',
        icon: 'DashboardOutlined',
        path: '/stock',
      },
      {
        name: '销售统计',
        icon: 'DashboardOutlined',
        path: '/dashboard',
      },
      {
        name: '人员管理',
        icon: 'DashboardOutlined',
        path: '/stock',
      },
      {
        name: '客户端管理',
        icon: 'DesktopOutlined',
        path: '/component',
        children: [
          {
            name: '首页装修',
            path: '/toolbar',
          },
          {
            name: '商品页装修',
            path: '/baseComponent',
          },
          {
            name: '分类页管理',
            path: '/column',
          },
          {
            name: '导航页管理',
            path: '/searchBar',
          },
          {
            name: '详情页管理',
            path: '/datatable',
          },
          {
            name: '优惠券管理',
            path: '/form',
          },
          {
            name: '积分管理',
            path: '/transferTree',
          },
          {
            name: '图表',
            path: '/charts',
            children: [
              {
                name: 'ECharts',
                path: '/charts/ec',
              },
              {
                name: 'G2',
                path: '/charts/g2',
              },
            ]
          },
          {
            name: '打印',
            path: '/print',
          },
          {
            name: 'Banner 管理',
            path: '/banner',
          },
        ],
      },
      {
        name: '用户管理',
        icon: 'ShareAltOutlined',
        path: '/ui',
        children: [
          {
            name: '用户列表',
            path: '/button',
          },
          {
            name: '优质用户管理',
            path: '/alerts',
          },
          {
            name: '动画',
            path: '/animations',
          },
          {
            name: '图标',
            path: '/icons',
          },
          {
            name: '富文本',
            path: '/editor',
          },
          {
            name: '模态窗',
            path: '/modal',
          },
          {
            name: '遮罩',
            path: '/mask',
          },
        ],
      },
      {
        name: '活动管理',
        icon: 'BookOutlined',
        path: '/page',
        children: [
          {
            name: '活动商品管理',
            path: '/sign/login',
          },
          {
            name: '商城活动管理',
            path: '/sign/register',
          },
          {
            name: '锁屏',
            path: '/lock',
          },
          {
            name: '画廊',
            path: '/gallery',
          },
          {
            name: '空白页',
            path: '/blank',
          },
          {
            name: '结果页',
            path: '/result',
          },
          {
            name: 'Coming Soon',
            path: '/coming',
          },
          {
            name: '403',
            path: '/403',
          },
          {
            name: '404',
            path: '/404',
          },
          {
            name: '500',
            path: '/500',
          },
          {
            name: '多级路由',
            path: '/level-route/:sub?',
          },
        ],
      },
      {
        name: '订单系统',
        icon: 'BulbOutlined',
        path: '/business',
        children: [
          {
            name: '批发订单系统管理',
            path: '/crud/:detail?',
          },
          {
            name: '零售订单系统管理',
            path: '/crud/:detail?',
          },
        ],
      },
    ], 400)
  } 
}