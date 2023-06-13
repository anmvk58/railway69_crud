
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

// Tao doi tuong employee:
function Employee(id, name, department, phone){
    this.id = id;
    this.name = name;
    this.department = department;
    this.phone = phone;
}

// Khoi tao du lieu cho danh sach
function make_list_employee(){
    list_employee.push(new Employee(1, 'Iron Man', 'Marketing', '0989253366'));
    list_employee.push(new Employee(2, 'Super Man', 'War', '098925XXXX'));
    list_employee.push(new Employee(3, 'Black Window', 'CEO', '098925XXXX'));
    list_employee.push(new Employee(4, 'Hulk', 'Developer', '098925XXXX'));
    list_employee.push(new Employee(5, 'Spider Man', 'Tester', '098925XXXX'));
    
}

// Để chèn nội dung vào thẻ tbody (JQuery)
function view_list_employee(){
    // Nếu danh sách chưa có dữ liệu thì mới khởi tạo
    if( list_employee == null || list_employee.length == 0){
        make_list_employee()
    }
    console.log('AAAA')
    // Dùng vòng lặp để append nội dung vào thẻ tbody của bảng table
    list_employee.forEach(function(item){
        $('tbody').append('<tr><td>'+ item.name + '</td><td>' + item.department + '</td><td>' + item.phone + '</td>' +
        '<td> <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i>'+
        '</a> <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
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
        delete list_employee[id-1]
        build_table()
    } else {
        console.log('Không xóa')
    }
}


