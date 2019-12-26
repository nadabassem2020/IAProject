$(function(){

    // Handle search filters
    $('.js-Filters li').on('click', function(){
        if(!($(this).hasClass('active'))){
            let filter = $(this).data('filter');
            $(this).addClass('active').siblings().removeClass('active');
            $('.js-SendedFilter').attr('value',filter);
        };
    });

    // Handling Form submitation
    $("form.js-regForm input[type='submit']").on('click',function(e){;
        e.preventDefault();
        var form = $(this).parents().find('form');
        var email = $(this).parents().find('input[type="email"]').val();
        var valid = true;
        
        // Error empty required inputs
        $(this).parents().find("input:not(.js-NotReq)").each(function(){
          if ($(this).val() == "") {
              $(this).parent().addClass('have-error');
              valid = false;
          }else{
              $(this).parent().removeClass('have-error');
          }
        });

        // Error if email is invalid
        if(!emailValidation(email)){
          $('input[type="email"]').parent().addClass('have-error');
          valid = false;
        }
                
        if(!valid){
          return false;
        }

        // Check if email exists
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/register/"+email+"/exists",
            success: function(response){
                console.log(response.exists);
                if(response.exists)
                    $('input[type="email"]').parent().addClass('have-error').find('.e-msg').html('Email is exists!');
                else
                    form.submit();
            }
        });

    });

    // Email Validation Checker
    function emailValidation(email) {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          return (true);
        }else{
          return (false);
        }
    }

    // Handle add new Answer
    $('.js-AddAns').on('click', function(){
        var count = $(this).parent().parent().find('input').length + 1;
         $(this).parent().parent().append('<input type="text" name="answers[]" value="" placeholder="Answer '+count+'" class="form-control" required>')
        console.log(count);
    });

});
