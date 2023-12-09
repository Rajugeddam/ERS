
# Employee Review System

Build a project to assign the a work to employee a give the review to the employee


## Installation

Install my-project with npm

```bash
  git clone https://github.com/amit-vis/Employee_Review_System.git
  npm install
  cd Employee_Review_System
```
    
## Running Tests

To run tests, run the following command

```bash
  npm start
```


## Folder Structure

* assets
    1. css
        - home.css
        - layout.css
    2. images
    3. js
        - delete_emp_review.js
        - delete_Employee.js
* config
    - kue.js
    - middleware.js
    - mongoose.js
    - nodeMailers.js
    - passport_local_stratergy.js
    - secure.js
* controllers
    - home_controller.js
    - admin_controller.js
    - reset_controller.js
    - review_controller.js
    - users_controller.js
* mailers
    - reset_mailers.js
* model
    - assignReview.js
    - myReview.js
    - reset.js
    - users.js
* routes
    - admin.js
    - index.js
    - reset.js
    - review.js
    - user.js
* views
   1. mailers
        a. reset
            - reset.ejs
    - _footer.ejs
    - _header.ejs
    - Admin_page.ejs
    - employee_add.ejs
    - Error.ejs
    - forgot.ejs
    - home.ejs
    - layout.ejs
    - recover.ejs
    - review.ejs
    - update.ejs
    - user_sign_in.ejs
    - user_sign_up.ejs
* workers
    - reset_mail_workers.js
- .gitignore
- index.js
- package-lock.json
- package.json






