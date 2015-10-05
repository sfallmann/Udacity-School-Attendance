/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.students  ) {
        console.log('Creating attendance records...');

        function getRandom() {
            return (Math.random() >= 0.5);
        }

        // list of student names
        var studentNames = [
            "Slappy the Frog",
            "Lilly the Lizard",
            "Paulrus the Walrus",
            "Gregory the Goat",
            "Adam the Anaconda"
        ];

        // empty array to hold the attendance data for the current student
        var studentData = [];

        for (var i=0; i < studentNames.length; i++){

            // set name to value for easy reference
            var name = studentNames[i];
            var attendance = [];


            for (var j = 0; j <= 11; j++) {
                attendance.push(getRandom());
            }

            // create a student object
            var student = {
                name: name,
                attendance: attendance
            }

            // add the student object to the student array
            studentData.push(student);

        }


        localStorage.students = JSON.stringify(studentData);
    }
}());

(function(){

    var students = JSON.parse(localStorage.students);

    // loop  through all of the students
    for (var i=0; i < students.length; i++){

        // create the row for the student
        var studentRow = $("<tr/>", { "class": "student" } );

        // add the student name in the first column
        studentRow.append($("<td/>", { "class": "name-col", "text": students[i].name }));

        console.log(students[i]);

        // set attendance to the values of  the current student's attendance list
        var attendance = students[i].attendance;

        // set missedTotal to 0 for current student
        var missedTotal = 0;

        // loop through each day to get the attendance values
        for (var j=0; j < attendance.length; j++){

            // set to attended for easy reference
            var attended = attendance[j];

            // if the current days value is false add to the missedTotal
            if (!attended){
                missedTotal++;
            }

            // create the checkbox input for this day
            var checkbox = $("<input/>",{ "type": "checkbox", "checked": attended });
            // add the checkbox and the td element it lives inside to the row
            studentRow.append($("<td/>",{ }).append(checkbox));

            // add a click listener to the checkbox
            checkbox.click(function(){

                // find the missed column in the row this checkbox lives in
                var missedCol = ($(this).closest("tr")).find(".missed-col");

                // get the value in the missed column
                var missedValue = missedCol.text();

                // check if the checkbox was already checked
                if ($(this).is(":checked")){

                    // if it was checked, and clicking unchecks it -- add this day to the missed total
                    missedValue++;
                    console.log(missedValue);
                }
                else{

                    // if it was unchecked, and clicking checks it -- remvoe this day from the missed total
                    missedValue--;
                    console.log(missedValue);
                }

                // update the value in the missed column
                missedCol.text(missedValue);

            });


        }

        // add the missed column to the row
        studentRow.append($("<td/>", { "class": "missed-col", "html": missedTotal }));
        // add the row to the table body
        $("#student-data").append(studentRow);

    }

}());

