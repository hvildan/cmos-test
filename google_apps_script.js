// =============================================================
// Google Apps Script — paste this into script.google.com
// This receives CMOS results and writes them to a Google Sheet
// =============================================================
//
// SETUP:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into Code.gs
// 3. Click Deploy > New deployment
// 4. Choose "Web app"
// 5. Set "Execute as" = Me, "Who has access" = Anyone
// 6. Click Deploy and copy the URL
// 7. Paste the URL into CONFIG.googleScriptUrl in index.html

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Results") || ss.insertSheet("Results");

    // Add header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Listener ID",
        "Device",
        "Trial ID",
        "Rating",
        "Swapped",
        "Start Time",
        "Submit Time"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }

    // Write each rating as a row
    var ratings = data.ratings || [];
    for (var i = 0; i < ratings.length; i++) {
      sheet.appendRow([
        new Date(),
        data.listenerId || "unknown",
        data.device || "unknown",
        ratings[i].trialId,
        ratings[i].rating,
        ratings[i].swapped,
        data.startTime,
        data.submitTime
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", count: ratings.length }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint
function doGet(e) {
  return ContentService
    .createTextOutput("CMOS Results endpoint is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}
