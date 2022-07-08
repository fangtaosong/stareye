$(document).ready(function () {
    if (localStorage.getItem("user_id") == null) {
        window.location.href = '/login'
    }
    var user_id = document.getElementById('user_id').getAttribute('d')
    $.post('/api/recommend/' + user_id.toString(), function (result) {
        result = JSON.parse(result)
        var recommend_news = JSON.parse(result.Re_news_list)
        var last_result = JSON.parse(result.last_news_list)
        console.log(recommend_news)
        console.log(last_result)
        $('#content-wrapper').html('')
        var content = ''
        for (let i = 0; i < 20; i++) {
            let item = "<a href='" + recommend_news.url[i] + "' class='item'>\n" +
                "        <div class=\"head-pic\" tabindex='0'>\n" +
                "            <img src='" + recommend_news.head_img[i] + "'>\n" +
                "        </div>\n" +
                "        <div class='word-box'>\n" +
                "            <h1 tabindex='0'>" + recommend_news.title[i] + "</h1>\n" +
                "            <h2 tabindex='0'>" + recommend_news.category[i] + "</h2>\n" +
                "            <p tabindex='0'>" + recommend_news.description[i] + "</p>\n" +
                "        </div>\n" +
                "    </a>\n"
            content += item
        }
        $('#content-wrapper').html(content)
        const item = document.getElementsByClassName('item')
        console.log(item)
        for (let i = 0; i < 20; i++) {
            item[i].addEventListener('click', function () {
                let data = jQuery.param({
                    'user_id': user_id,
                    'news_id': recommend_news.newsId[i],
                    'timestamp': new Date().getTime(),
                    'read_time': 120
                })
                $.post('/update', data, function () {
                    alert('update')
                })
            })
        }
    })
})