import React from 'react';

$('.content').on('click','.item',function (e) {
  let text = $(e.target).text()
  location.href = 'https://www.google.com/search?q='+text
})