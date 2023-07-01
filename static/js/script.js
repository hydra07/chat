$(document).ready(function() {
    getData();

    // Tự động cập nhật dữ liệu mỗi 1 giây
    setInterval(function() {
        getData();
    }, 1000);
});
//-------------------------------------------------------------------------------------------------------------------
// Hàm gửi yêu cầu Ajax để lấy dữ liệu mới
function getData() {
    $.ajax({
        url: '/chatdata',
        type: 'GET',
        success: function(response) {
            var jsonData = response;
            //get last 10 items
            var lastTenItems = jsonData.slice(-10);
            // console.log(lastTenItems)
            //delete all old items
            $('#data-container').empty();
            //new ul
            var ulElement = $('<ul>');
            var proviousUser = null;
            //
            for (var i = 0; i < lastTenItems.length; i++) {
                var item = lastTenItems[i];
                // console.log(item)
                // processMessage(item.user, item.text, ulElement);
                var ul
                var li = $('<li>').text(item.text);
                if(item.user === proviousUser){
                    ul = ulElement.children().last();
                    ul.append(li);
                }else{
                    ul = $('<ul>').text(item.user+':').append(li);
                    // ul.append(li);
                    ulElement.append(ul);
                    proviousUser = item.user;
                }


                // var liElement = $('<li>').text(item.user + ': ' + item.text);
                //console.log(item)
                // ulElement.append(liElement);
            }

            // ad ul to div id 'data-container'
            $('#data-container').append(ulElement);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
// ----------------------------------------------------------------------------------------------------------------
// // Tạo một kết nối SSE
// var eventSource = new EventSource('/chatdata/stream');

// // Bắt sự kiện khi nhận được dữ liệu từ máy chủ
// eventSource.onmessage = function(event) {
//     var jsonData = JSON.parse(event.data);
//     updateUI(jsonData);
// };

// // Cập nhật giao diện người dùng với dữ liệu mới
// function updateUI(data) {
//   //get last 10 items
//     var lastTenItems = data.slice(-10);
//     $('#data-container').empty();
//     var ulElement = $('<ul>');
//     var previousUser = null;
    
//     for (var i = 0; i < lastTenItems.length; i++) {
//     var item = lastTenItems[i];
//     var ul;
//     var li = $('<li>').text(item.text);
    
//     if (item.user === previousUser) {
//         ul = ulElement.children().last();
//         ul.append(li);
//     } else {
//         ul = $('<ul>').text(item.user + ':').append(li);
//         ulElement.append(ul);
//         previousUser = item.user;
//     }
//     }
    
//     $('#data-container').append(ulElement);
// }

// ----------------------------------------------------------------------------------------------------------------
var message = '';

function processMessage(user, text, ulElement){
    var ul =$('<ul>').text(user+':');
    if(user === proviousUser){
        // message +='\t\t' + text;
        var liElement = $('<li>').text(text);
        ul.append(liElement);
    }
    else{
        // console.log(user+':');
        var liElement = $('<li>').text(text);
        ul.append(liElement);
        ulElement.append(ul);
        proviousUser = user;
        // message = '\t\t'+text;
        
    }
    // console.log(message)
    message = '';
}


// processMessage('hydra', 'Hello');
// processMessage('hydra', 'How are you?');
// processMessage('hydra', 'How are you?2');
// processMessage('nothydra', 'How are you?3');
// console.log("hello")
// ----------------------------------------------------------------------------------------------------------------

// var darkModeToggle = document.getElementById('dark-mode-toggle');
document.addEventListener('DOMContentLoaded', function() {
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.checked = false;

    darkModeToggle.addEventListener('change', function(){
        if(darkModeToggle.checked){
            // document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
        }else{
            document.body.classList.remove('dark-mode');
        }
    });
});



