/**
* @jest-environment jsdom
*/


var data = [
    {
      "UserID": 1,
      "UserName": "rooter",
      "Password": "12345",
      "Country": "UK",
      "Email": "sac@gmail.com"
    },
    {
      "UserID": 2,
      "UserName": "binu",
      "Password": "123",
      "Country": "uk",
      "Email": "Binu@gmail.com"
    },
    {
      "UserID": 3,
      "UserName": "cal",
      "Password": "123",
      "Country": "uk",
      "Email": "cal@gmail.com"
    },
    {
      "UserID": 4,
      "UserName": "nera",
      "Password": "1234",
      "Country": "uk",
      "Email": "nera@gmail.com"
    }
  ];
  
  var keys = [];
  
  document.write("<table border==\"1\"><tr>");
  for (key in data[0]) {
      document.write('<td>' + key + '</td>');
  }
  document.write("</tr>");
  for (var i = 0; i < data.length; i++) {
      document.write('<tr>');
      for (key in data[i]) {
        document.write('<td>' + data[i][key] + '</td>');
    }
      document.write('</tr>');
  }
  document.write("</table>");