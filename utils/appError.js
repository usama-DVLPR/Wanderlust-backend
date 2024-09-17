class AppError extends Error{
    constructor(message, statusCode){
        // call supper when we extend parent class (super call parent constructor)
        super(message);

        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')? 'fail':'error';
        this.isOperational=true;

        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports=AppError;