function readyFn( jQuery ) {
    
    // moment date
    const today = moment();
    
    // Time and Date
    $("#currentDay").text(today.format("dddd | MMMM Do YYYY | hh:mm a"));

    // Function to create rows for schedule
    function createScheduler(date) {

        // schedule time begins at 9 am
        date = moment(date).hour(9);

        for (let i = 0; i < 24; i++) {
            
            // Set up rows
            const rowDiv = $("<div>").addClass("row").attr("id", `row${i}`);
            // Set up hours
            const hourDiv = $("<div>").addClass("col-1 hour time-block d-flex align-items-center justify-content-center").text(date.format("H a")).attr("id", `hour${i}`); 
            // Area which user can input notes.
            const textDiv = $("<textarea>").addClass("col-10 time-block text-box save-block").attr("id", `text${i}`);
            // Save button when user finish input notes
            const saveDiv = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn save-block");
            let saveBtnIcon = $("<button>").addClass("btn fas fa-save fa-lg save-button").attr("id", i).attr("title", "Save");
            $(".container").append(rowDiv.append(hourDiv,textDiv,saveDiv.append(saveBtnIcon)));

            // color theme is based on different timing of the day
            if (today.isAfter(date, "hour")) {
                textDiv.addClass("past");
            } else if (today.isBefore(date, "hour")) {
                textDiv.addClass("future");
            } else {
                textDiv.addClass("present");
            }
            date.add(1, "hour");
        }        
    }

    // call createScheduler for functions
    $( window ).on("load", createScheduler());

    let saveButton = $(".saveBtn");
    let textBox = $(".text-box");
    let clearBtn = $(".clr-btn");
    
    // function to display stored information
    function displayToDo() {
        for (let i = 0; i < 24; i++) {
            let storedCalList = localStorage.getItem("text" + i);
            $("#text" + i).text(storedCalList);
        }
    }
    //user click on function which will stored or clear information
    function addText(event) {
        event.preventDefault();
        localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
    }

    saveButton.click(addText);
    displayToDo();
    clearBtn.on("click", function() {
        localStorage.clear();
        textBox.empty();
        location.reload();
    });
};
$( document ).ready( readyFn );