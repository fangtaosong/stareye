if (localStorage.getItem("user_id") !== "admin") {
    window.location.href = '/login'
}
// 类别饼状图
let category_chart=echarts.init(document.getElementById('category-chart'));
let category_option = {
    title: {
        text: '各类别新闻数量',
        subtext: '(共17类别)',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
        },
    legend:{
        orient: 'vertical',
        left: 'left'
    },
    series:[
        {
            name: '新闻数量',
            type: 'pie',
            radius: '50%',
            data:[
                { value: 683, name: '运动' },
                { value: 309, name: '育儿' },
                { value: 671, name: '文化' },
                { value: 650, name: '历史' },
                { value: 729, name: '情感' },
                { value: 506, name: '教育' },
                { value: 428, name: '科普' },
                { value: 1030, name: '娱乐' },
                { value: 601, name: '旅游' },
                { value: 622, name: '军事' },
                { value: 441, name: '汽车' },
                { value: 711, name: '数码' },
                { value: 437, name: '宠物' },
                { value: 469, name: '科技' },
                { value: 512, name: '财经' },
                { value: 771, name: '房产' },
                { value: 172, name: '证券' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0,0,0,0.5)'
                }
            }
        }
    ]
}
category_chart.setOption(category_option)
// 前十阅读新闻柱状图
let top_news_chart=echarts.init(document.getElementById('top-news-chart'))
let top_news_chart_option = {
    title: {
        text: '前十浏览量新闻',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
    xAxis: {
        name: '新闻id',
        type: 'category',
        data: ['356','318','296','593','2571','260','480','110','589','527']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '浏览次数',
            data: [329,317,307,279,278,251,238,237,224,220],
            type: 'bar'
        }
    ]
}
top_news_chart.setOption(top_news_chart_option)
// 时间分布曲线图
      let time_distri_chart=echarts.init(document.getElementById('time-distri-chart'))
      let time_option = {
        title: {
          text: '一周新闻浏览总量时间分布图',
          subtext: '(平均记录)',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ['周一','周二','周三','周四','周五','周六','周日',]
        },
        yAxis: {
          type: 'value'
        },
        series: {
            name: '新闻浏览量',
            type: 'line',
            smooth: true,
            data: [8170,20755,8219,15456,11529,17466,11074]
        }
      }
      time_distri_chart.setOption(time_option)
// 前十阅读量用户阅读相似性网络图
let relation_chart = echarts.init(document.getElementById("users-like-chart"));
      let categories = [];
      for (let i = 0; i <= 3; i++) {
        categories[i] = {
          name: '类别' + i
        };
      }
      let relation_option = {
        // 图的标题
        title: {
          text: '前十阅读时长用户相似性网络图',
            subtext: '(最大点: 78.03 | 最大边: 13.38)',
          left: 'center'
        },
        // 提示框的配置
        tooltip: {
          formatter: function (x) {
            return x.data.des;
          }
        },
        // 工具箱
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            mark: {
              show: true
            },
            // 还原
            restore: {
              show: true
            },
            // 保存为图片
            saveAsImage: {
              show: true
            }
          }
        },
        legend: [{
          // selectedMode: 'single',
          data: categories.map(function (a) {
            return a.name;
          }),
          orient: 'vertical',
          left: 'left'
        }],
        series: [{
          type: 'graph', // 类型:关系图
          layout: 'force', //图的布局，类型为力导图
          symbolSize: 20, // 调整节点的大小
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          edgeSymbolSize: [2, 10],
          emphasis: {
            scale: true,
            focus: 'adjacency',
          },
          edgeLabel: {
            show: true,
            textStyle: {
              fontSize: 15
            },
            formatter: function (x) {
              return x.data.lineStyle.width
            }
          },
          force: {
            repulsion: 7000,
            edgeLength: [60, 80]
          },
          draggable: true,
          lineStyle: {
            width: 2
          },
          label: {
            show: true,
            position: 'top'
          },
          data: [
              {
                  name: '68',
                  category: 1,
                  symbolSize: 50,
                  des: '55.10',
              },
              {
                  name: '274',
                  category: 1,
                  symbolSize: 50,
                  des: '52.91',
              },
              {
              name: '288',
              category: 2,
              symbolSize: 40,
                  des: '43.15'
              },
              {
              name: '380',
              category: 2,
              symbolSize: 40,
                  des: '47.15',
              },
              {
              name: '414',
              category: 0,
              symbolSize: 60,
                  des: '78.03'
              },
              {
              name: '448',
              category: 1,
              symbolSize: 50,
                  des: '52.83'
              },
              {
              name: '474',
              category: 1,
              symbolSize: 50,
                  des: '53.77'
              },
              {
              name: '599',
              category: 0,
              symbolSize: 60,
                  des: '68.86'
              },
              {
              name: '606',
              category: 3,
              symbolSize: 30,
                  des: '33.40'
              },
              {
              name: '610',
              category: 2,
              symbolSize: 40,
                  des: '41.27'
              },
          ],
          links: [
              {
                  source: '68',
                  target: '274',
                  lineStyle: {
                      width: 6.62,
                  }
              },
              {
                  source: '68',
                  target: '288',
                  lineStyle: {
                      width: 4.67,
                  }
              },
              {
                  source: '68',
                  target: '380',
                  lineStyle: {
                      width: 5.69,
                  }
              },
              {
                  source: '68',
                  target: '414',
                  lineStyle: {
                      width: 9.5,
                  }
              },
              {
                  source: '68',
                  target: '448',
                  lineStyle: {
                      width: 6.29,
                  }
              },
              {
                  source: '68',
                  target: '474',
                  lineStyle: {
                      width: 5.9,
                  }
              },
              {
                  source: '68',
                  target: '499',
                  lineStyle: {
                      width: 7.9,
                  }
              },
              {
                  source: '68',
                  target: '606',
                  lineStyle: {
                      width: 3.77,
                  }
              },
              {
                  source: '68',
                  target: '610',
                  lineStyle: {
                      width: 4.76,
                  }
              },
              {
                  source: '274',
                  target: '288',
                  lineStyle: {
                      width: 4.57,
                  }
              },
              {
                  source: '274',
                  target: '380',
                  lineStyle: {
                      width: 6.4,
                  }
              },
              {
                  source: '274',
                  target: '414',
                  lineStyle: {
                      width: 8.56,
                  }
              },
              {
                  source: '274',
                  target: '448',
                  lineStyle: {
                      width: 5.73,
                  }
              },
              {
                  source: '274',
                  target: '474',
                  lineStyle: {
                      width: 4.72,
                  }
              },
              {
                  source: '274',
                  target: '599',
                  lineStyle: {
                      width: 7.83,
                  }
              },
              {
                  source: '274',
                  target: '606',
                  lineStyle: {
                      width: 2.9,
                  }
              },
              {
                  source: '274',
                  target: '610',
                  lineStyle: {
                      width: 5.58,
                  }
              },
              {
                  source: '288',
                  target: '380',
                  lineStyle: {
                      width: 4.11,
                  }
              },
              {
                  source: '288',
                  target: '414',
                  lineStyle: {
                      width: 7.23,
                  }
              },
              {
                  source: '288',
                  target: '448',
                  lineStyle: {
                      width: 4.92,
                  }
              },
              {
                  source: '288',
                  target: '474',
                  lineStyle: {
                      width: 5.96,
                  }
              },
              {
                  source: '288',
                  target: '599',
                  lineStyle: {
                      width: 5.92,
                  }
              },
              {
                  source: '288',
                  target: '606',
                  lineStyle: {
                      width: 3.07,
                  }
              },
              {
                  source: '288',
                  target: '610',
                  lineStyle: {
                      width: 2.7,
                  }
              },
              {
                  source: '380',
                  target: '414',
                  lineStyle: {
                      width: 7.23,
                  }
              },
              {
                  source: '380',
                  target: '448',
                  lineStyle: {
                      width: 5.57,
                  }
              },
              {
                  source: '380',
                  target: '474',
                  lineStyle: {
                      width: 3.82,
                  }
              },
              {
                  source: '380',
                  target: '599',
                  lineStyle: {
                      width: 6.76,
                  }
              },
              {
                  source: '380',
                  target: '606',
                  lineStyle: {
                      width: 2.38,
                  }
              },
              {
                  source: '380',
                  target: '610',
                  lineStyle: {
                      width: 5.19,
                  }
              },
              {
                  source: '414',
                  target: '448',
                  lineStyle: {
                      width: 9.14,
                  }
              },
              {
                  source: '414',
                  target: '474',
                  lineStyle: {
                      width: 10.77,
                  }
              },
              {
                  source: '414',
                  target: '599',
                  lineStyle: {
                      width: 13.38,
                  }
              },
              {
                  source: '414',
                  target: '606',
                  lineStyle: {
                      width: 5.61,
                  }
              },
              {
                  source: '414',
                  target: '610',
                  lineStyle: {
                      width: 6.61,
                  }
              },
              {
                  source: '448',
                  target: '474',
                  lineStyle: {
                      width: 5.29,
                  }
              },
              {
                  source: '448',
                  target: '599',
                  lineStyle: {
                      width: 7.9,
                  }
              },
              {
                  source: '448',
                  target: '606',
                  lineStyle: {
                      width: 2.98,
                  }
              },
              {
                  source: '448',
                  target: '610',
                  lineStyle: {
                      width: 5.01,
                  }
              },
              {
                  source: '474',
                  target: '599',
                  lineStyle: {
                      width: 8.37,
                  }
              },
              {
                  source: '448',
                  target: '606',
                  lineStyle: {
                      width: 5.81,
                  }
              },
              {
                  source: '448',
                  target: '610',
                  lineStyle: {
                      width: 3.13,
                  }
              },
              {
                  source: '599',
                  target: '606',
                  lineStyle: {
                      width: 4.74,
                  }
              },
              {
                  source: '599',
                  target: '610',
                  lineStyle: {
                      width: 6.06,
                  }
              },
              {
                  source: '606',
                  target: '610',
                  lineStyle: {
                      width: 2.23,
                  }
              },
          ],
          categories: categories,
        }]
      }
      relation_chart.setOption(relation_option)
// 前十阅读量用户
let top_readers_chart=echarts.init(document.getElementById('top-readers-chart'))
let top_readers_chart_option = {
    title: {
        text: '前十阅读时长用户',
        subtext: '(阅读时长单位: 秒)',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
    xAxis: {
        name: '用户id',
        type: 'category',
        data: ['414','474','599','448','380','274','606','68','249','182']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '阅读新闻时长',
            data: [9147.5,7161,6544,5302.5,4469,4351.5,4075.5,4072,3862.5,3426.5],
            type: 'bar'
        }
    ]
}
top_readers_chart.setOption(top_readers_chart_option)