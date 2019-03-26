let path = require("path"); //using this common Node module to easily path our routes
let mortgageJs = require("mortgage-js");




module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

  app.post("/calculate", function(req, res) {
    
    let mortgageCalculator = mortgageJs.createMortgageCalculator();
    mortgageCalculator.totalPrice = parseInt(req.body.loan);
    mortgageCalculator.downPayment = parseInt(req.body.downPay);
    mortgageCalculator.interestRate = parseInt(req.body.interestRate);
    mortgageCalculator.months = parseInt(req.body.loanTerm);
    mortgageCalculator.taxRate = 0.012;
    mortgageCalculator.insuranceRate = 0.0013;
    mortgageCalculator.mortgageInsuranceRate = 0.010;
    mortgageCalculator.mortgageInsuranceEnabled = true;
    mortgageCalculator.mortgageInsuranceThreshold = 0.2;
    mortgageCalculator.additionalPrincipalPayment = parseInt(req.body.additionalPrincipalPayment);

    let payment = mortgageCalculator.calculatePayment();
    
    console.log(payment);


    //Results to show modal
    //loanAmount
    //principalAndInterest
    //tax
    //insurance
    //total
    let mortgageCalculation = {
      
      loan: payment.loanAmount,
      principalAndInterest: payment.principalAndInterest,
      tax: payment.tax,
      insurance: payment.insurance,
      total:payment.total
    }
    console.log(mortgageCalculation);

    res.json(mortgageCalculation);
  });



};
