// let crud = JSON.parse(localStorage.getItem("inputdata")) || [];

// let isEdit = -1;

// const datasubmit = () => {
//     const name = document.getElementById("name").value;
//     const eml = document.getElementById("eml").value;
//     const num = document.getElementById("number").value;
//     const searched = document.getElementById("search").value;

//     let alldata = { name: name, email: eml, number: num, search: searched };

//     if (
//         isEdit === -1
//     ) {
//         crud.push(alldata);
//     }
//     else {
//         let inputdata = crud.map((item, index) => {
//             if (index === isEdit) {
//                 return alldata;
//             }
//             else return item
//         })
//         crud = inputdata;
//     }

//     localStorage.setItem("inputdata", JSON.stringify(crud));
//     tabledata();
// };

// const tabledata = () => {
//     document.getElementById("tbody").innerHTML = crud?.map((item, index) => {
//         return (
//             `
//             <tr>
//             <td>${item.name}</td>
//             <td>${item.email}</td>
//             <td>${item.number}</td>
//             <td><button onclick="remove(${index})"  id="btn">Remove</button></td>
//             <td><button onclick="edit(${index})"  id="btn">Edit</button></td>
//             </tr>
//             `
//         )
//     })
//         .join("");
// };

// tabledata();

// const remove = (index) => {
//     let deletdata = crud.filter((item, index1) => { return (index1 !== index) });
//     crud = deletdata;
//     localStorage.setItem("inputdata", JSON.stringify(crud));
//     tabledata();
// };

// const edit = (index1) => {
//     isEdit = index1;
//     let add = crud?.find((item, index) => index === index1);
//     document.getElementById("name").value = add.name;
//     document.getElementById("eml").value = add.email;
//     document.getElementById("number").value = add.number;
// };

// const datasort = () => {

//     let sorted = crud.sort((item, index) => { return (item.name > index.name ? 1 : -1) })
//     crud = sorted
//     tabledata()

// };

// const searchdata = () => {
//     let searched = document.getElementById("search").value;
//     let searchh = crud.filter((item, index) => { return (item.name === searched) });
//     crud = searchh;
//     tabledata();
// };

let crud = JSON.parse(localStorage.getItem("hello")) || [];
let editIndex = -1;

// ✅ Add or Update Data
const datasubmit = () => {
    const name = document.getElementById("name").value.trim();
    if (!name) return alert("Please enter a name!");

    if (editIndex === -1) {
        crud.push({ name });
    } else {
        crud[editIndex].name = name;
        editIndex = -1;
    }
    document.getElementById("name").value = "";
    localStorage.setItem("hello", JSON.stringify(crud));
    tabledata();
};

// ✅ Render Table Data
const tabledata = () => {
    document.getElementById("tbody").innerHTML = crud.map((item, index) => `
        <tr>
            <td><input type="checkbox" class="rowCheckbox" data-index="${index}"></td>
            <td>${item.name}</td>
            <td><button onclick="remove(${index})">Remove</button></td>
            <td><button onclick="edit(${index})">Edit</button></td>
        </tr>
    `).join('');

    updateCheckboxListeners(); // Call after rendering
};

// ✅ Remove Data
const remove = (index) => {
    crud.splice(index, 1);
    localStorage.setItem("hello", JSON.stringify(crud));
    tabledata();
};

// ✅ Edit Data
const edit = (index) => {
    document.getElementById("name").value = crud[index].name;
    editIndex = index;
};

// ✅ Search Data
const searchdata = () => {
    let searched = document.getElementById("search").value.toLowerCase();
    let filteredData = crud.filter(item =>
        item.name.toLowerCase().includes(searched)
    );
    document.getElementById("tbody").innerHTML = filteredData
        .map((item, index) => `
            <tr>
                <td><input type="checkbox" class="rowCheckbox" data-index="${index}"></td>
                <td>${item.name}</td>
                <td><button onclick="remove(${index})">Remove</button></td>
                <td><button onclick="edit(${index})">Edit</button></td>
            </tr>
        `)
        .join('');
};

// ✅ Sort Data
const sorted = () => {
    crud.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem("hello", JSON.stringify(crud));
    tabledata();
};

// ✅ Select/Deselect All Checkboxes
const updateCheckboxListeners = () => {
    const selectAllCheckbox = document.getElementById("selectAll");
    const rowCheckboxes = document.querySelectorAll(".rowCheckbox");

    // ✅ Attach Listener to "Select All"
    selectAllCheckbox.addEventListener("change", function () {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // ✅ Deselect "Select All" if any row is unchecked
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            selectAllCheckbox.checked = [...rowCheckboxes].every(cb => cb.checked);
        });
    });
};

// ✅ Initial Render
tabledata();


// ✅ Remove Selected Rows
const removeSelected = () => {
    const rowCheckboxes = document.querySelectorAll(".rowCheckbox:checked");
    if (rowCheckboxes.length === 0) {
        alert("Please select at least one item to delete.");
        return;
    }

    // Get the indexes of selected rows
    const indexesToRemove = [...rowCheckboxes].map(cb => parseInt(cb.dataset.index));

    // Filter out the items that are not selected
    crud = crud.filter((_, index) => !indexesToRemove.includes(index));

    // Update localStorage and re-render table
    localStorage.setItem("hello", JSON.stringify(crud));
    tabledata();
};
