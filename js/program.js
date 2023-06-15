
$(function(){
    $("#header").load("html/header.html"); 
    $("#footer").load("html/footer.html"); 
    $("#main").load("html/body.html"); 
});

function HomePage(){
    $("#main").load("html/body.html"); 
} 

function EmployeePage(){
    $("#main").load("html/employee.html", function(){
        view_list_employee()
    }); 
    
}

// Khai bao ra danh sach
var list_employee = []
var count = 0;

// Tao doi tuong employee:
function Employee(name, department, phone){
    this.id = ++count;
    this.name = name;
    this.department = department;
    this.phone = phone;
}

// Khoi tao du lieu cho danh sach
function make_list_employee(){
    list_employee.push(new Employee('Iron Man', 'Marketing', '0989253366'));
    list_employee.push(new Employee('Super Man', 'War', '098925XXXX'));
    list_employee.push(new Employee('Black Window', 'CEO', '098925XXXX'));
    list_employee.push(new Employee('Hulk', 'Developer', '098925XXXX'));
    list_employee.push(new Employee('Spider Man', 'Tester', '098925XXXX'));
    
}

// Để chèn nội dung vào thẻ tbody (JQuery)
function view_list_employee(){
    // Nếu danh sách chưa có dữ liệu thì mới khởi tạo
    if( list_employee == null || list_employee.length == 0){
        make_list_employee()
    }
    console.log(list_employee)
    // Dùng vòng lặp để append nội dung vào thẻ tbody của bảng table
    list_employee.forEach(function(item){
        $('tbody').append('<tr><td>'+ item.name + '</td><td>' + item.department + '</td><td>' + item.phone + '</td>' +
        '<td> <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i>'+
        '</a> <a class="edit" title="Edit" data-toggle="tooltip" onclick="open_update_modal(' + item.id + ')"><i class="material-icons">&#xE254;</i></a>'+
        '<a class="delete" title="Delete" data-toggle="tooltip" onclick="delete_employee(' + item.id + ', \''+ item.name + '\')"><i class="material-icons">&#xE872;</i></a></td></tr>')
    });
    
}

function build_table(){
    // clear nội dung của tbody đã:
    $('tbody').empty()
    view_list_employee()
    
}


function delete_employee(id, name){
    var result = confirm("Bạn có chắc chắn muốn xóa "+ name + " ra khỏi danh sách ?");
    if (result) {
        // Get index of value need to delete
        var index = list_employee.findIndex((x) => x.id == id)

        list_employee.splice(index, 1);
        build_table()
    } else {
        console.log('Không xóa')
    }
}


function open_modal(){
    $("#myModal").modal('show');
}

function close_modal(){
    $("#myModal").modal('hide');
}

function create_new_employee(){
    var input_name = document.getElementById('name').value
    var input_department = document.getElementById('department').value
    var input_phone = document.getElementById('phone').value

    if (input_name == '' || input_department == '' || input_phone == ''){
        // Thông báo ko hợp lệ
        // Close modal 
        close_modal()
    } else {
        // Thêm phần tử mới vào danh sách
        list_employee.push(new Employee(input_name, input_department, input_phone))

        // Vẽ lại bảng khi có thêm phần tử mới
        build_table()

        // Close modal 
        close_modal()
    }
}

// Xóa nội dung của các thẻ trong form nhập
function reset_form(){
    $('#myModalTitle').text('Add new Employee')
    $('#id').val('');
    $('#name').val('');
    $('#department').val('');
    $('#phone').val('');
}

function open_add_new_modal(){
    reset_form();
    open_modal();
}

function open_update_modal(id){
    // Sửa title cho modal
    $('#myModalTitle').text('Update Employee')
    // Dựa vào id lấy được index của phần tử trong mảng:
    var index = list_employee.findIndex((x) => x.id == id)

    // Lấy các giá trị của phần tử có id = id truyền vào
    var name = list_employee[index].name
    var department = list_employee[index].department
    var phone = list_employee[index].phone

    // Gán các giá trị vừa lấy được vào html
    $('#id').val(id);
    $('#name').val(name);
    $('#department').val(department);
    $('#phone').val(phone);

    // Hiển thị modal lên
    open_modal()
}

function update_employee(){
    var input_id = document.getElementById('id').value
    var input_name = document.getElementById('name').value
    var input_department = document.getElementById('department').value
    var input_phone = document.getElementById('phone').value

    // Dựa vào id lấy được index của phần tử trong mảng:
    var index = list_employee.findIndex((x) => x.id == input_id)
    list_employee[index].name = input_name
    list_employee[index].department = input_department
    list_employee[index].phone = input_phone
    
    // rebuild lai table:
    build_table()

    // Close modal 
    close_modal()
}

function save(){
    // Check có giá trị id ở modal hay ko?
    var id = document.getElementById('id').value

    console.log(id)

    if ( id == ''){
        // thêm mới 
        create_new_employee()
    } else {
        // update
        update_employee()
    }

}