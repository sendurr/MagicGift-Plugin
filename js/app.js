Parse.$ = jQuery;




var app = new kendo.mobile.Application($(document.body), {
    platform: "ios7" //"ios", "ios7", "android", "blackberry" and "wp
        // skin: "android-light"
});


Parse.Object.setDefaultACL = function(acl) {
    this._defaultAcl = acl.toJSON();
}
Parse.Object.getDefaultACL = function() {
    return this._defaultAcl;
}

// override initialize (which is empty by default) to set the default acl
// when a new object is created
Parse.Object.prototype.initialize = function() {
    blackList = ["Profile",
        "ChatGroup", "ChatGroupPost",
        "Club", "ClubApplication", "ClubChat", "ClubMember", "ClubMemberInvitation", "ClubQuestion",
        "MyChatGroup", "MyCourse", "Contact", "Task", "CourseNote","Homework","Test"
    ];
    if (blackList.indexOf(this.className) >= 0) {
        return;
    }
    var aclHash = Parse.Object.getDefaultACL();
    if (aclHash) {
        var acl = new Parse.ACL(aclHash);
        this.setACL(acl);
    }
}



    function register() {
        app.navigate("#signup", "slide:left");
    }


    function loginFacebook() {

        Parse.FacebookUtils.logIn(null, {
            // FB.init({
            success: function(user) {
                if (!user.existed()) {
                    alert("User signed up and logged in through Facebook!");
                } else {
                    alert("User logged in through Facebook!");
                }
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }
    
    var gNotification;
    $(document).ready(function() {

        gNotification = $("#notifyuser").kendoNotification({
            position: {
                pinned: true,
                bottom: 10,
                right: 10,
            },
            // height: 200,
            // width:200,
            // autoHideAfter: 0,
            autoHideAfter: 3000,
            stacking: "up",
            templates: [{
                type: "info",
                template: $("#emailTemplate").html()
            }, {
                type: "error",
                template: $("#errorTemplate").html()
            }, {
                type: "success",
                template: $("#successTemplate").html()
            }, {
                type: "hint",
                template: $("#hintTemplate").html()
            }]

        }).data("kendoNotification");
    });


    var gUsername = "";
    var gPassword = "";
    $(document).ready(function() {
        //set up the previously used login info
        if (localStorage.getItem('vi')) {
            gUsername = localStorage.getItem('vi'); //sessionStorage for one session variable store
            gUsername = CryptoJS.AES.decrypt(gUsername, "classmadellc2015").toString(CryptoJS.enc.Utf8);
            $("#email").val(gUsername);
            console.log("get username.." + gUsername);
        } else {
            gUsername = "";
        }
        if (localStorage.getItem('qi')) {
            gPassword = localStorage.getItem('qi'); //sessionStorage for one session variable store
            gPassword = CryptoJS.AES.decrypt(gPassword, "classmadellc2015").toString(CryptoJS.enc.Utf8);
            $("#password").val(gPassword);
            console.log("get password.." + gPassword);
        } else {
            gPassword = "";
        }

        // $("#email").focus();


    });

    function onShow(e) {
        if (!$("." + e.sender._guid)[1]) {
            var element = e.element.parent(),
                eWidth = element.width(),
                eHeight = element.height(),
                wWidth = $(window).width(),
                wHeight = $(window).height(),
                newTop, newLeft;

            newLeft = Math.floor(wWidth / 2 - eWidth / 2);
            newTop = Math.floor(wHeight / 2 - eHeight / 2);

            e.element.parent().css({
                top: newTop,
                left: newLeft
            });
        }
    }
    
    

// localStorage.setItem('todos', todos);
// $('#todos').html(localStorage.getItem('todos'));
// window.localStorage.clear();
// location.reload();

 var viewModelLogin = kendo.observable({
        email: '', //"siri@gespim.com"
        password: '', //"hdd"
        savepassword: true,
        // email: "stockwow@gmail.com",
        // password:"hddsgdhd",
        logIn: function() {



            // checkAppVersion();
            var email = this.get("email").toLowerCase().trim();
            var password = this.get("password");
            var savepassword = this.get("savepassword");

            console.log("login....");
            // app.navigate("#profile");



            if (email == "" && gUsername != "") {
                email = gUsername;
            }
            if (password == "" && gPassword != "") {
                password = gPassword;
            }

            kendo.ui.progress($("#login_waiting"), true);
            Parse.Config.get().then(function(config) {
                gAppConfig = Parse.Config.current();
             
                    console.log("version check done..." + email);


                    Parse.User.logIn(email, password, {
                        success: function(user) {

                            gUser = user;
                            // loadConfig();

                            load_profile();
                            console.log("profile loaded......");

                            kendo.ui.progress($("#login_waiting"), false);
                            //save it for next login without typing
                            if (savepassword) {
                                localStorage.setItem('vi', CryptoJS.AES.encrypt(email, "classmadellc2015"));
                                localStorage.setItem('qi', CryptoJS.AES.encrypt(password, "classmadellc2015"));
                            } else {
                                localStorage.setItem('vi', '');
                                localStorage.setItem('qi', '');
                            }
                            window.history.back();
                            return;

                        },
                        error: function(user, error) {
                            kendo.ui.progress($("#login_waiting"), false);
                            gNotification.show({
                                title: "Login failed!",
                                message: "check password/email or internet connection"
                            }, "error");

                            return;
                        }
                    });

                
            }, function(error) {
                // Something went wrong (e.g. request timed out)
            });



        }

    });
    kendo.bind($("#login"), viewModelLogin);


    function loadConfig (argument) {
        // body...
    }



    function register() {
        app.navigate("#signup", "slide:left");
    }


    function loginFacebook() {
        // FB.getLoginStatus(function(response) {
        //   if (response.status === 'connected') {
        //     console.log('Logged in.');
        //   }
        //   else {
        //     FB.login();
        //   }
        // });

        Parse.FacebookUtils.logIn(null, {
            // FB.init({
            success: function(user) {
                if (!user.existed()) {
                    alert("User signed up and logged in through Facebook!");
                } else {
                    alert("User logged in through Facebook!");
                }
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


var viewModelSignup = kendo.observable({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    login:function(){
        app.navigate("#login");
    },
    signUp: function() {
            event.preventDefault();
            var firstname = this.get("firstname");
            var lastname = this.get("lastname");
            var username = this.get("email").toLowerCase().trim();
            var email = username
            var password = this.get("password");
            //var password_confirm = this.get("password_confirm");
            console.log(username+password);

            if (!validateEmail(email)) {
                gNotification.show({
                    title: "Signup failed! ",
                    message: "Invalid email"
                }, "error");
                return;
            }
            if (firstname == "" || lastname == "") {
                gNotification.show({
                    title: "Signup failed! ",
                    message: "First/lastname are required"
                }, "error");
                return;
            }

            console.log("continue running..." + email);

        

            console.log($('#checkbox_terms').prop('checked'));
            if ($('#checkbox_terms').prop('checked') == false) {
                $('#checkbox_terms').focus();
                gNotification.show({
                    title: "Signup failed!",
                    message: "You need to agree to our service terms by clicking the checkbox"
                }, "error");

                return false;
            }


            Parse.User.signUp(username, password, {
                ACL: new Parse.ACL()
            }, {
                success: function(newuser) {

                    gUser = newuser;
                    console.log("new user created");
                    return;

                    user.setEmail(email);
                    user.save();
                    //create profile and config records
                    var Profile = Parse.Object.extend("Profile");
                    var profile = new Profile();
                    profile.set("user", newuser);
                    profile.set("email", email);

                   

                    profile.set("forums", []);
                    profile.set("clubs", []);
                    profile.set("events", []);
                    profile.set("jobs", []);

                    //options
                    profile.set("show_helphint", true);
                    profile.set("show_coursecode", true);
                    profile.set("show_courseloc", true);
                    profile.set("show_coursename", true);
                    profile.set("show_weekend", true);



                    profile.save(null, {
                        success: function(result) {
                            //ACL control. by defaul,all objs will set as public read and write by owner
                            //for profile, we only allow it to be accessible to classmates and clubmemebers and friends
                            //TODO: user can have option to disclose address/email/phone info to friends +classmates
                            // console.log(result.getACL());

                            console.log("profile public readable..." + result.className);
                            acl = new Parse.ACL();
                            acl.setPublicReadAccess(false);
                            acl.setPublicWriteAccess(false);
                            //create a role for all my contacts to see my email and phone info in my profile object.
                            var role = new Parse.Role("P_" + result.id, acl);
                            role.getACL().setRoleReadAccess(role, true);
                            role.save();
                            acl.setRoleReadAccess(role, true);
                            acl.setWriteAccess(user.id, true);
                            acl.setReadAccess(user.id, true);
                            result.setACL(acl);
                            result.save();


                            console.log("profile created:" + result.id);
                            // Execute any logic that should take place after the object is saved.
                            // console.log('New profile created with objectId: ' + result.id);
                            gProfile = result;
                            //create openUser object
                            var OpenUser = Parse.Object.extend("OpenUser");
                            var openUser = new OpenUser();
                            openUser.set("user", user);
                            openUser.set("profile", gProfile);
                            openUser.set("firstname", firstname);
                            openUser.set("lastname", lastname);

                            acl = new Parse.ACL();
                            acl.setPublicReadAccess(true);
                            acl.setWriteAccess(user.id, true);
                            acl.setReadAccess(user.id, true);
                            openUser.setACL(acl);
                            openUser.save(null, {
                                success: function(result) {
                                    gUser = result;

                                    var anonymousid = randomString(5, "#aA");
                                    user.set("anonymousid", anonymousid);
                                    user.set("profile", gProfile);
                                    user.save(null, {
                                        success: function(result) {
                                            // Execute any logic that should take place after the object is saved.
                                            // console.log('New object created with objectId: ' + result.id);
                                            // app.navigate("#selectUniversity");
                                            // app.navigate("#selectuniversitymodal");
                                        }
                                    });

                                    
                                }
                            });

                        },
                        error: function(result, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            console.log('Failed to create new profile, with error code: ' + error.message);
                        }
                    });



                    // app.navigate('#login','slide:right');
                    var template = kendo.template($("#listTemplate").html());
                    var data = ["What is next:",
                        "1:  goto your email inbox and locate the activation email",
                        "2:  click the link in the email to activate your account",
                        "3:  click the login button on the top-left corner",
                        "4:  input your email and password to log in",
                        "5:  go to More-->Setting-->Semester to choose current semester",
                        "6:  start adding courses and enjoy the app!"
                    ];
                    var result = template(data); //Execute the template
                    $("#aftersignup_message_text").html(result); //Append the result
                    app.navigate("#aftersignup", 'slide:right');

                },
                error: function(user, error) {
                    // error.preventDefault();
                    // console.log("singup info incorrect!" + error.message);
                    gNotification.show({
                        title: "Oops, Signup failed",
                        message: error.message
                    }, "error");
                    return false;
                }
            });

        } //end signup
});
kendo.bind($("#signup"), viewModelSignup);




var viewModelAddRecipient = kendo.observable({
    firstname: "",
    lastname: "",
    relationship: "",
    nickname: "",
    birthday: null,
    email: "",
    phone:"",
    address: "",
    city:"",
    zipcode:"",
    country:"223",
    save:function(){

        console.log("saving new recipient");
        console.log(this.get("email"));
        GiftRecipient = Parse.Object.extend("GiftRecipient");
        p = new GiftRecipient();
        p.set("user",gUser);
        p.set("firstname",this.get("firstname"));
        p.set("lastname",this.get("lastname"));
        p.set("relationship",this.get("relationship"));
        p.set("nickname",this.get("nickname"));
        p.set("birthday",this.get("birthday"));
        p.set("email",this.get("email"));
        p.set("phone",this.get("phone"));
        p.set("address",this.get("address"));
        p.set("city",this.get("city"));
        p.set("zipcode",this.get("zipcode"));
        p.set("country",this.get("country"));
        p.set("gender",this.get("gender"));
        p.save(null,{
            success:function(recipient){
                console.log("recipient created");
                viewModelAddRecipient.set("firstname","");
                viewModelAddRecipient.set("lastname","");
                viewModelAddRecipient.set("relationship","");
                viewModelAddRecipient.set("email","");
                //viewModelAddRecipient.set("phone","");
                // load_profile();
                loadGiftRecipients();
            },
            error:function (obj,error) {
                // body...
                console.log(error.message);
            }
        })
    }
});

kendo.bind($("#addrecipient"), viewModelAddRecipient);



var editrecipientStatus=false;
var viewModelEditRecipient = kendo.observable({
    firstname: "",
    lastname: "",
    relationship: "",
    nickname: "",
    birthday: null,
    email: "",
    phone:"",
    address: "",
    city:"",
    gender:"",
    zipcode:"",
    country:"223",
    save:function(){
        // if(editrecipientStatus ==false){
        //     console.log("change to save...");
        //     editrecipientStatus=true;
        //     $('#editrecipient_inputs').find('input, textarea, button, select').attr('disabled',false);
        //     $("#editrecipient_inputs :input").attr("disabled", false);

        //     $("#button_editrecipient").text("Save");
        //     return;
        // }
        console.log("saving recipient");

        console.log("saving new recipient");
        console.log(this.get("email"));
        GiftRecipient = Parse.Object.extend("GiftRecipient");
        p = new GiftRecipient();
        p.id =  gCurrentRecipient.id;
        p.set("user",gUser);
        if(this.get("firstname")){ p.set("firstname",this.get("firstname"));};
        if(this.get("lastname")){ p.set("lastname",this.get("lastname"));}
        if(this.get("relationship")){ p.set("relationship",this.get("relationship"))};
        if(this.get("nickname")){ p.set("nickname",this.get("nickname"));}
        if(this.get("birthday")){ p.set("birthday",this.get("birthday"));}
        if(this.get("email")){ p.set("email",this.get("email"));}
        if(this.get("phone")){ p.set("phone",this.get("phone"));}
        if(this.get("addressa")){ p.set("address",this.get("address"));}
        if(this.get("city")){ p.set("city",this.get("city"));}
        if(this.get("zipcode")){ p.set("zipcode",this.get("zipcode"));}
        if(this.get("country")){ p.set("country",this.get("country"));}
        if(this.get("gender")){ p.set("gender",this.get("gender"));}
        p.save(null,{
            success:function(recipient){
                // load_profile();
                loadGiftRecipients();
                // $("#button_editrecipient").text("Edit");
                // $("#editrecipient_inputs :input").attr("disabled", false);
                // editrecipientStatus = false;

                console.log("recipient created");
                viewModelAddRecipient.set("firstname","");
                viewModelAddRecipient.set("lastname","");
                viewModelAddRecipient.set("relationship","");
                viewModelAddRecipient.set("email","");
                //viewModelAddRecipient.set("phone","");
                window.history.back();
            },
            error:function (obj,error) {
                // body...
                console.log(error.message);
            }
        })
    }
});

kendo.bind($("#editrecipient"), viewModelEditRecipient);

console.log("end app loading...");






