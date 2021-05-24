$("#register").click(function () {
    let status = true;
    let acc1 = $("[name=fName]").eq(0).val();
    let acc2 = $("[name=mName]").eq(0).val();
    let acc3 = $("[name=lName]").eq(0).val();
    let acc4 = $("[name=user]").eq(0).val();
    let acc5 = $("[name=pwd]").eq(0).val();
    let acc6 = $("[name=pwdr]").eq(0).val();
    let acc7 = $("[name=email]").eq(0).val();
    let acc8 = $("[name=dob]").eq(0).val();
    let acc9 = $("[name=phone]").eq(0).val();
    let gt = $("#gender");

    console.log(status);
    let status2 = true;
    $.ajax({
        url: "https://eprojectbytranxuantung.herokuapp.com/api/users/checkLoginByUsernamePassword?username=" + acc4,
        method: "GET",
        async: false,
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            if (data) {
                status2 = false;
            }
        }
    })

    let status3 = true;
    if (acc5 != acc6) {
        status3 = false;
    }

    let formData1 = {
        username: acc4,
        password: acc5,
        firstName: acc1,
        middleName: acc2,
        lastName: acc3,
        gender: parseInt(gt.val()),
        email: acc7,
        dob: acc8,
        phoneNumber: acc9,
    }
    if (status == true && status2 == true) {
        $.ajax({
            url: "https://eprojectbytranxuantung.herokuapp.com/api/users/addCustomer?username="+acc4+"&password="+acc5+"&firstName"+acc1+"&middleName="+acc2+"&lastName="+acc3,
            method: "POST",
           
            dataType: "json",
            async: false,
            data: JSON.stringify(formData1),
            contentType: 'application/json'
        });
        alert("Thêm thành công!");
          window.location.href = 'login.html';
    } else if (status == false) {
        alert("Không được bỏ trống");
    } else if (status3 == false) {
        alert("Mật khẩu phải giống nhau!");
    } else {
        alert("Tài khoản này đã tồn tại!");
    }

});









