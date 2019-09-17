// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "login"
    $("form[name='login']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        username: "required",
        password: {
          required: true,
          minlength: 5
        }
      },
      // Specify validation error messages
      messages: {
        username: "Please enter your firstname",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        
      },

      
      // use the form.submit function and event handler to call ajax command and check for username
    //   submitHandler: function(form) {
    //     form.submit(function(event){
    //         // let user = $("#username").val();
    //         // let pw  = $("#password").val();
    //         console.log(1);

    //         // $.ajax({
    //         //     type: "GET",
    //         //     url: "http://localhost:3000/human-resources",
    //         //     dataType: 'json',               
    //         // }).done(function(data){
                  
    //         // });
    //     event.preventDefault();
    //     }
    //     );
    //   }
    });

    //use Ajax to check for username in server
    $( "form[name='login']" ).submit(function( event ) {
     
       let user = $("#username").val();
       let pw  = $("#password").val();

        $.ajax({
                        type: "GET",
                        url: "http://localhost:3000/human-resources",
                        dataType: 'json',     

                    }).done(function(data){
                        //foo checks the value of user & pw with database
                        let foo = data.filter((element, index)=>{
                                return element.username == user && element.password == pw;
                    });
                    //do action here if user is authentic
                    if(foo.length > 0){
                        alert("welcome User");
                    }
                    //do action here if user is not authentic
                    else{
                        alert("Invalid Username or Password");
                    }
               
                        
                        });
                   
        //prevent submit from opening in new tab
        event.preventDefault();
      });
  });