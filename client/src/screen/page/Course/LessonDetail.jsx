import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function SQLInjectionLesson() {
  const phpCode = `<?php
$conn = mysqli_connect("db", "myuser", "mypassword", "sqli"); 
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$user=$_POST["username"];
$pass=$_POST["password"];
$query = mysqli_query($conn, "Select * from users where username='$user' and password='$pass';");
$row =  mysqli_fetch_array($query);
if(mysqli_num_rows($query)){
    echo "<h1><center>Bingo!!! You are logged in!</center></h1>";

    $users_data = mysqli_query($conn, "select * from users;");
    echo "<table border='1'><thead><td>username</td><td>password</td></thead>";
    while($row = mysqli_fetch_array($users_data)) {
        echo "<tr><td>".$row["username"]."</td><td>".$row["password"]."</td></tr>";
    }
    echo "</table>";
    
}
else{
    echo "<strong style='color:red;'>Invalid Credentials.</strong><br><br>";
}
?>`;

  const sqlQuery = `SELECT * FROM users WHERE username='$user' AND password='$pass';`;
  const sqlQuery2 = `SELECT * FROM users WHERE username= 'admin' and password = 'RANDOM' or '1'='1;`;

  return (
    <div id="doc" className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Introduction to SQL Injection</h1>
      <ul className="list-disc list-inside mb-4">
        <li>
          ການໂຈຕີແບບ SQL Injection ແມ່ນການໂຈມຕີຮູບແບບໜຶ່ງທີ່ໃຊ້ຊ່ອງໂຫວ່ຂອງ
          Database ໃນການດຶງຂໍ້ມູນອອກມາໂດຍບໍ່ພຶ່ງປະສົງຂອງເຈົ້າຂອງລະບົບໃດໜຶ່ງ
        </li>
        <li>
          ການໂຈມຕີຮູບແບບ SQL Injection ປະກອບດ້ວຍການໃສ່ SQL Query ຜ່ານຊ່ອງທາງ
          Input ຕ່າງໆ, ຫາກການໂຈມຕີສຳເລັດກໍຈະເຮັດໃຫ້ Hacker
          ສາມາດອ່ານຂໍ້ມູນ(Select), ເພີ່ມຂໍ້ມູນ(Update) ແກ້ໄຂຂໍ້ມູນ(Insert),
          ລົບຂໍ້ມູນ(Delete) ທີ່ສຳຄັນບໍວ່າຈະເປັນ user, password, personal
          information ຕ່າງໆທີ່ຖືກເກັບໄວ້ໃນ Database ໄດ້, ຫຼື
          ຮ້າຍແຮງໄປກວ່ານັ້ນຍັງສາມາດສັ່ງຄຳສັ່ງຜ່ານສິດ Administrator ໃນ Database
          ໄດ້ເຊັ່ນ: ການສັ່ງ Shutdown database ເປັນຕົ້ນ
        </li>
      </ul>
      <p>ຕົວຢ່າງ php code ທີ່ມີຊ່ອງໂຫວ່ໂດຍຈະກວດສອບການ login ດ້ວວຍ user</p>
      <SyntaxHighlighter language="php" style={vscDarkPlus}>
        {phpCode}
      </SyntaxHighlighter>
      <p>ຈາກຕົວຢ່າງ code ຂ້າງເທິງ, ຈະໄດ້ query ເປັນ</p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus}>
        {sqlQuery}
      </SyntaxHighlighter>
      <p>
        ເຊິ່ງຈະເຫັນວ່າຖ້າຫາກເຮົາແທນຄ່າໃນ $user ເປັນ admin ແລະ password ເປັນ
        RANDOM' or '1'='1 ຈະໄດ້ query ອອກມາເປັນ
      </p>
      <SyntaxHighlighter language="sql" style={vscDarkPlus}>
        {sqlQuery2}
      </SyntaxHighlighter>
      <p>
        ເຊິ່ງນັ້ນໝາຍຄວາມວ່າຖ້າຫາກເຮົານຳເອົາຄ່າ <code>admin</code> ໄປປ້ອນໃນ
        parameter username ແລະ <code>'RANDOM' or '1'='1</code> ໄປປ້ອນໃນ
        parameter password ຈະເຮັດໃຫ້ເຮົາສາມາດຕອບ login ຫຼື
        ກໍຄືສາມາດເຂົ້າສູ່ລະບົບໄດ້ໂດຍບໍ່ຕ້ອງຮູ້ລະຫັດຂອງ user ນັ້ນໆໄດ້ເລີຍນັ້ນເອງ.
      </p>

      <h2 className="text-2xl font-bold mt-8">Question</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          ຈົ່ງໃຊ້ຊ່ອງໂຫວ່ SQL Injection ໃນການ bypass login ເປັນ admin ແລ້ວນຳ
          flag ທີ່ໄດ້ມາຕອບ
        </li>{" "}
        <li className="mt-8">
          LAB{" "}
          <a
            href="http://192.168.100.73:30000/"
            target="_blank"
            className="text-blue-500"
          >
            http://192.168.100.73:30000/
          </a>
        </li>
      </ul>
      <div className="input-container">
        <h3 className="text-xl font-bold mb-4">ສົ່ງຄຳຕອບ</h3>
        <input
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
          type="text"
          placeholder="Your answer..."
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

export default SQLInjectionLesson;
