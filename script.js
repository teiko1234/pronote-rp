// Liste des utilisateurs (pour simuler une base de données)
var users = {
    "admin": {password: "adminpass", role: "vie_scolaire"},
    "prof1": {password: "prof1pass", role: "professeur"},
    "eleve1": {password: "eleve1pass", role: "eleve"},
    "eleve2": {password: "eleve2pass", role: "eleve"},
    "eleve3": {password: "eleve3pass", role: "eleve"}
};

// Liste des groupes/classes et des élèves
var groups = {};  // Structure : { 'Mathématiques': ['eleve1', 'eleve2'], 'Français': ['eleve2', 'eleve3'] }
var grades = {};  // Structure : { 'eleve1': { 'Mathématiques': [note1, note2], 'Français': [note1] }, ... }
var absences = {}; // Structure : { 'eleve1': { 'Mathématiques': [date1], 'Français': [date2] }, ... }

function connect() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    // Vérification des identifiants
    if (users[username] && users[username].password === password && users[username].role === role) {
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("restrictedMessage").style.display = "none";

        // Si la vie scolaire est connectée
        if (role === "vie_scolaire") {
            document.getElementById("vieScolaireDashboard").style.display = "block";
        }

        // Si le professeur est connecté
        if (role === "professeur") {
            document.getElementById("professorDashboard").style.display = "block";
        }
    } else {
        document.getElementById("restrictedMessage").style.display = "block";
        document.getElementById("dashboard").style.display = "none";
    }
}

// Créer un groupe
function createGroup() {
    var groupName = document.getElementById("newGroupName").value;
    if (groupName && !groups[groupName]) {
        groups[groupName] = [];
        document.getElementById("groupList").innerHTML += `<li>${groupName}</li>`;
    } else {
        alert("Ce groupe existe déjà ou le nom est vide !");
    }
}

// Ajouter un élève à un groupe
function addStudentToGroup() {
    var selectedStudent = document.getElementById("studentsList").value;
    var groupName = document.getElementById("newGroupName").value;
    
    if (groups[groupName] && groups[groupName].indexOf(selectedStudent) === -1) {
        groups[groupName].push(selectedStudent);
        alert(`${selectedStudent} a été ajouté au groupe ${groupName}`);
    } else {
        alert("Ce groupe n'existe pas ou l'élève est déjà dans ce groupe.");
    }
}

// Professeur - Ajouter une note
function addGrade() {
    var classCategory = document.getElementById("classCategory").value;
    var studentName = prompt("Nom de l'élève :");
    var grade = prompt("Note de l'élève :");

    if (studentName && grade) {
        if (!grades[studentName]) {
            grades[studentName] = {};
        }
        if (!grades[studentName][classCategory]) {
            grades[studentName][classCategory] = [];
        }
        grades[studentName][classCategory].push(grade);
        alert(`Note de ${grade} ajoutée pour ${studentName} dans ${classCategory}.`);
    }
}

// Professeur - Marquer une absence
function markAbsence() {
    var classCategory = document.getElementById("classCategory").value;
    var studentName = prompt("Nom de l'élève :");
    var absenceDate = prompt("Date de l'absence (format : YYYY-MM-DD) :");

    if (studentName && absenceDate) {
        if (!absences[studentName]) {
            absences[studentName] = {};
        }
        if (!absences[studentName][classCategory]) {
            absences[studentName][classCategory] = [];
        }
        absences[studentName][classCategory].push(absenceDate);
        alert(`Absence de ${studentName} ajoutée pour le ${absenceDate} dans ${classCategory}.`);
    }
}
