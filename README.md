# Tywin

[![Greenkeeper badge](https://badges.greenkeeper.io/eabait/tywin-api.svg)](https://greenkeeper.io/)

Tywin is an ongoing experiment that aims at creating a maintainable NodeJS seed/boilerplate project. The main
goal is to be more than an integration of useful libraries as most boilerplates projects are. Tywin is my search of a minimal design for a NodeJS project that applies the best of software architecture. Most inspiration is drawn from Clean Architecture and DDD (domain-driven design).

### Tasks
Remaining tasks

- [ ] Project setup
  - [x] Basic Fastlify project structure
  - [x] Database connection
  - [x] Lint
  - [x] Config using env
  - [ ] Prettier
  - [ ] Docker and docker-compose
  - [x] Working unit tests
  - [ ] Integration tests
  - [ ] Stress tests
  - [ ] Coverage rules
  - [x] Helmet plugin
  - [x] Run Sequelize migrations

### Modules
The following modules will be implemented. Each module represents (or tries to) a bounded context.

- [ ] Session services
  - [ ] Login
  - [ ] Logout
  - [ ] Register
  - [ ] Forget password
  - [ ] Refresh session

- [ ] User services
  - [ ] Create
  - [ ] List
  - [ ] Update
  - [ ] Delete
  - [ ] Detail

### Design Decisions
* Authentication with JWT
* Role-based Authorization
