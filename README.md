# GoBarber
GoBarber is a fictitious project created as part of the GoStack course from [Rocketseat](https://rocketseat.com.br/). GoStack is a course covering _React JS_, _React Native_, and _Node.js_. The project is composed of:

- **GoBarber mobile** - [GitHub](https://github.com/renandf/gobarber-mobile) - the mobile app which allows users to create an account and book appointments with "barbers".
- **[GoBarber web](https://gobarber.renancastro.com/)** (this project) - an online app for "barbers" to be able to see their schedule of appointments.
- **GoBarber API** - [GitHub](https://github.com/renandf/gobarber-backend) - the back-end portion of the GoBarber project responsible for saving data from the mobile and web apps into the database and also feeding data into those apps.

## GoBarber web
- Online example: [gobarber.renancastro.com](https://gobarber.renancastro.com/)

The goal of this app is to allow "barbers" (service providers) to check their calendar of appointments, highlighting their next one, and also allowing them to navigate to specific days to check future appointments.

**Highlighted features and technology:**
- Built with [React JS](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/), using [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- Covers a full [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) scenario communicating with custom API
- Registration flow with validation examples
- Flow to reset password including email with a tokenized link
- Custom calendar with weekend and past date restrictions
- Unit test examples using [Jest](https://jestjs.io/)
- Continuous Integration/Delivery ([CI/CD](https://en.wikipedia.org/wiki/CI/CD)) via GitHub actions
