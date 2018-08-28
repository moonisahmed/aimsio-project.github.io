function getJSONdata(){


        //Loading JSON
        function loadJSON(callback) {   
            let xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', 'resume.json', true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
                }
            };
            xobj.send(null);  
        }

        // Initializing Loaded JSON
        function init() {
            loadJSON(function(response) {
            // Parse JSON string into object
            let resume_JSON = JSON.parse(response);                

            // Header Section 
            document.getElementById("name").innerHTML =  '<b>' + resume_JSON.header.name + '</b>';
            document.getElementById("professions").innerHTML =  '<b>' + resume_JSON.header.professions + '</b>';
            document.getElementById("github").innerHTML =  resume_JSON.header.links.github;
            document.getElementById("phone").innerHTML =  resume_JSON.header.links.phone;
            document.getElementById("email").innerHTML =  resume_JSON.header.links.email;
            document.getElementById("linkedIn").innerHTML =  resume_JSON.header.links.linkedIn;

            
            // Main Body
            document.getElementById("ed-title").innerHTML = '<b>' + resume_JSON.educationalBackground.title + '</b>';
            document.getElementById("ed-background").innerHTML = getEducationalBackground(resume_JSON.educationalBackground);
            document.getElementById("we-title").innerHTML = '<b>' + resume_JSON.workExperience.title + '</b>';
            document.getElementById("work").innerHTML = getWorkHistory(resume_JSON.workExperience.Work);
            document.getElementById("techincalBackground-title").innerHTML = '<b>' + resume_JSON.technicalBackground.title + '</b>';
            document.getElementById("technicalSkills").innerHTML = gettechnicalSkills(resume_JSON.technicalBackground.skills);
            document.getElementById("relevantProjects-title").innerHTML = '<b>' + resume_JSON.relevantProjects.title + '</b>';
            document.getElementById("relevantProjects-Projects").innerHTML = getProjects(resume_JSON.relevantProjects.Projects);
            document.getElementById("additionalSkills-title").innerHTML = '<b>' + resume_JSON.additionalSkills.title + '</b>';
            document.getElementById("additionalSkills-Lists").innerHTML = getProjects(resume_JSON.additionalSkills.skills);
            document.getElementById("volunteerActivities-title").innerHTML = '<b>' + resume_JSON.volunteerActivities.title + '</b>';
            document.getElementById("volunteerActivities-Lists").innerHTML = getProjects(resume_JSON.volunteerActivities.skills);
            document.getElementById("additionalProjects-title").innerHTML = '<b>' + resume_JSON.additionalProjects.title + '</b>';
            document.getElementById("additionalProjects-Lists").innerHTML = getProjects(resume_JSON.additionalProjects.Projects);
            document.getElementById("relevantCourses-title").innerHTML = '<b>' + resume_JSON.relevantCourses.title + '</b>';
            document.getElementById("relevantCourses-Lists").innerHTML = getBulletPoints(resume_JSON.relevantCourses.Lists);


            });
        }

        // Get Techincal Skills
        function gettechnicalSkills(location){
        //Technical Skills
            let myObj = location;
            let txt = "";

            for (x in myObj) {
                txt += "<li class='secondTitle'> <b>" + myObj[x].title + "</b></li>";
                txt += "<li>" + myObj[x].description + "</li>";
                txt += "<br>";
            }

            return txt;
        }

        // Get Bullet Points
        function getBulletPoints(location){
            //bulletPoints
            let myObj = location;
            let txt = "";
            
            for (x in myObj) {

                txt += "<li>" + myObj[x].text + "</li>";
                
            }

            return txt;
        }

        // Get Projects 
        function getProjects(location){
            //getProjects
            let myProjects = location;
            let txt = "";
            

            for (x in myProjects) {
                txt += "<li class='secondTitle'> <b>" + myProjects[x].title + "</b></li>";
                txt += "<li>" + myProjects[x].description + "</li>";
                txt += getBulletPoints(myProjects[x].bulletPoints);
                txt += "<br>";
            }
            
            
            return txt;
        }

        // Get Work History
        function getWorkHistory(location){
            //getWorkHistory
            let myWorkHistory = location;
            let txt = "";
            

            for (x in myWorkHistory) {
                txt += "<li class='secondTitle'> <b>" + myWorkHistory[x].jobTitle + "</b></li>";
                txt += "<li class='description'>" + myWorkHistory[x].subTitle + "</li>";
                txt += "<li>" + myWorkHistory[x].tenure + "</li>";
                txt += "<li>" + myWorkHistory[x].summary + "</li> <br>";   
                txt += getBulletPoints(myWorkHistory[x].bulletPoints);
                txt += getProjects(myWorkHistory[x].Projects);
            }
            
            
            return txt;
        }
        
        // Get Educational Background
        function getEducationalBackground(location){
            //getEducationalBackground
            let myedHistory = location;
            let txt = "";

            txt += "<li class='description'>" + myedHistory.university + "</li>";
            txt += "<li>" + myedHistory.degree + "</li>";
            txt += getBulletPoints(myedHistory.bulletPoints);


            return txt;
        }

        init();
}

getJSONdata();