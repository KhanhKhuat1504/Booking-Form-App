// Run jQuery
$(document).ready(function () {
  console.log("ready");
});

// Initiate a cost tracker variable
let costCounter = 0;

// Function to update the cost text field
function adultSelectChange(event) {
  // Get number of adults, checkin date and checkout date values
  const numAdults = parseInt($("#adult").val(), 10);
  const checkDefaultIn = $("#checkin").val();
  const checkDefaultOut = $("#checkout").val();

  // Check if checkin and checkout date is not empty string
  if (checkDefaultIn !== "" && checkDefaultOut !== "") {
    // Get checkin and checkout dates values and calculate days difference and cost
    const currentInDate = moment($("#checkin").val());
    const currentOutDate = moment($("#checkout").val());
    let differenceInDays = Math.abs(currentInDate.diff(currentOutDate, "days"));
    let updateCost = 150 * numAdults * differenceInDays;
    // Update value for cost
    $("#cost").val(updateCost);
    costCounter++;
    if ($("#costDisplay").addClass("has-error")) {
      $("#costDisplay").removeClass("has-error");
    }
  }
}

// Function to update both the cost and days text fields.
function checkInChange(event) {
  // Get the new date
  const newDate = event.target.value;
  // Create new moment object for Check In
  const momentObjIn = moment(new Date(newDate));
  // Get the value of the Check-Out display
  const currentOutDate = $("#checkout").val();

  // Update the Days Display
  if (currentOutDate !== "") {
    // Then perform subtraction and update Days
    const momentObjOut = moment(new Date(currentOutDate));
    let differenceInDays = Math.abs(momentObjIn.diff(momentObjOut, "days"));
    // Validate checkin date
    if (momentObjIn.isAfter(momentObjOut)) {
      toasterOptions();
      toastr.error(
        "Enter an appropriate Check-In date.",
        "Check-In date cannot be after Check-Out date."
      );
      costCounter = 0;
      // Reset the default placeholder of Check-In
      $("#checkin").val($("#checkin").attr("placeholder"));
      $("#days").val($("#days").attr("placeholder"));
      $("#cost").val($("#cost").attr("placeholder"));
      return;
    }
    $("#days").val(differenceInDays);
    const numAdults = parseInt($("#adult").val(), 10);
    $("#cost").val(150 * numAdults * differenceInDays);
    costCounter++;
    if ($("#costDisplay").addClass("has-error")) {
      $("#costDisplay").removeClass("has-error");
    }
  }
}

// Function to update both the cost and days.
function checkOutChange(event) {
  // Get new date in String format
  const newDate = event.target.value;
  // Convert string into a usable Moment.js Date object
  const momentObjOut = moment(new Date(newDate));
  // Create new Moment object based on date
  const currentInDate = $("#checkin").val();

  if (currentInDate !== "") {
    const momentObjIn = moment(new Date(currentInDate));
    let differenceInDays = Math.abs(momentObjOut.diff(momentObjIn, "days"));

    if (momentObjOut.isBefore(momentObjIn)) {
      toasterOptions();
      toastr.error(
        "Enter an appropriate Check-Out date.",
        "Check-Out cannot be before Check-In."
      );
      costCounter = 0;
      // Reset the default placeholder of Check-In
      $("#checkout").val($("#checkout").attr("placeholder"));
      $("#days").val($("#days").attr("placeholder"));
      $("#cost").val($("#cost").attr("placeholder"));
      return;
    }
    // Update Days Display
    $("#days").val(differenceInDays);
    const numAdults = parseInt($("#adult").val(), 10);
    $("#cost").val(150 * numAdults * differenceInDays);
    costCounter++;
    if ($("#costDisplay").addClass("has-error")) {
      $("#costDisplay").removeClass("has-error");
    }
  }
}

// Function for reset button
function resetForm(event) {
  costCounter = 0;
  $("form")[0].reset();
  toasterOptions();
  toastr.info("Form fields were successfully cleared.", "Info");
}

// Function to reset the username field hasError
function usernameValueChanged(event) {
  if ($("#usernameInput").hasClass("has-error")) {
    $("#usernameInput").removeClass("has-error");
  }
}

// Function to reset the first name field hasError
function firstNameValueChanged(event) {
  if ($("#firstnameInput").hasClass("has-error")) {
    $("#firstnameInput").removeClass("has-error");
  }
}
// Function to reset the last name field
function lastNameValueChanged(event) {
  if ($("#lastnameInput").hasClass("has-error")) {
    $("#lastnameInput").removeClass("has-error");
  }
}
// Function to reset the telephone text input
function telValueChanged(event) {
  if ($("#phoneInput").hasClass("has-error")) {
    $("#phoneInput").removeClass("has-error");
  }
}

// Function to reset the fax text input
function faxValueChanged(event) {
  if ($("#faxInput").hasClass("has-error")) {
    $("#faxInput").removeClass("has-error");
  }
}

// Function to reset the email hasError
function emailValueChanged(event) {
  if ($("#emailInput").hasClass("has-error")) {
    $("#emailInput").removeClass("has-error");
  }
}

// Function for the submit button
function submitForm(event) {
  let failedTracker = 0;
  const inputs = [
    "#username",
    "#firstname",
    "#lastname",
    "#phone",
    "#fax",
    "#email"
  ];

  inputs.forEach((input) => {
    const $input = $(input);
    const $inputParent = $input.parent();

    if ($input.val() === "") {
      $inputParent.addClass("has-error");
      toastr.error(`The ${$input.attr("id")} field is required.`, "Error");
      failedTracker++;
    }
  });

  if (costCounter === 0) {
    // Cost was never calculated
    $("#costDisplay").addClass("has-error");
    toastr.error("No cost was calculated.", "Error");
    failedTracker++;
  }

  if (failedTracker > 0) {
    event.preventDefault();
  }
  // Display success toaster
  if (failedTracker === 0) {
    toasterOptions();
    toastr.success("Form was successfully submitted.", "Success");
  }
}

// Function to customize toaster
function toasterOptions() {
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "100",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "show",
    hideMethod: "hide"
  };
}
