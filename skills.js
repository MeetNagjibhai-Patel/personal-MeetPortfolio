import { db } from './firebaseConfig.js';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

const skillsCollection = collection(db, 'skills');

// Add a new skill to Firestore
document.getElementById("addSkillForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const skillName = document.getElementById("skillName").value;
    const skillDescription = document.getElementById("skillDescription").value;
    const experienceRating = document.getElementById("experienceRating").value;

    try {
        await addDoc(skillsCollection, {
            name: skillName,
            description: skillDescription,
            rating: parseInt(experienceRating)
        });
        document.getElementById("addSkillForm").reset();
    } catch (error) {
        console.error("Error adding skill: ", error);
    }
});

// Render skill data into table rows
function renderSkill(doc) {
    const skillsList = document.getElementById("skillsList");
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", doc.id);

    tr.innerHTML = `
        <td>${doc.data().name}</td>
        <td>${doc.data().description}</td>
        <td>${doc.data().rating}</td>
        <td>
            <button onclick="openEditModal('${doc.id}', '${doc.data().name}', '${doc.data().description}', ${doc.data().rating})">Edit</button>
            <button onclick="deleteSkill('${doc.id}')">Delete</button>
        </td>
    `;
    skillsList.appendChild(tr);
}

// Listen for real-time updates and render skills
onSnapshot(skillsCollection, (snapshot) => {
    document.getElementById("skillsList").innerHTML = "";
    snapshot.forEach((doc) => renderSkill(doc));  // Render each skill
});

// Modal handling: Open the modal
window.openEditModal = function (id, name, description, rating) {
    const modal = document.getElementById("editModal");
    modal.style.display = "flex";

    // Pre-fill modal with skill data
    document.getElementById("editSkillName").value = name;
    document.getElementById("editSkillDescription").value = description;
    document.getElementById("editExperienceRating").value = rating;

    // Handle form submission for editing the skill
    document.getElementById("editSkillForm").onsubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "skills", id), {
                name: document.getElementById("editSkillName").value,
                description: document.getElementById("editSkillDescription").value,
                rating: parseInt(document.getElementById("editExperienceRating").value)
            });
            modal.style.display = "none"; 
        } catch (error) {
            console.error("Error updating skill: ", error);
        }
    };
};

// Close modal when close button is clicked
document.querySelector(".close").onclick = function () {
    document.getElementById("editModal").style.display = "none";
};


// Delete a skill from Firestore
window.deleteSkill = async function (id) {
    try {
        await deleteDoc(doc(db, "skills", id));
        alert("Skill deleted successfully");
    } catch (error) {
        console.error("Error deleting skill: ", error);
    }
};
