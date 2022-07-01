
export type Option = {
    _id:String,
    isCorrect:Boolean,
    value:String
}

export type Question = {
    _id:String,
    quizId:String,
    title:String,
    options:Option[]

}
export type Quiz
= {
    _id:String,
    title:String,
    quizCoverImage:String,
    creatorId: 
     String,
    quizDifficulty: 
    String,
    categoryId:String,
    quizDesc: String,
    totalQuestion: Number,
    totalPlayedUser: Number,
}

export type QuizCategory = {
    name: String,
    img:  String,
    description: String,
    creatorId: String,
    quizCount:  Number,
}