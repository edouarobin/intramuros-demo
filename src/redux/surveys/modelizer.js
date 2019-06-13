// @flow

export const modelizeSurvey = (apiSurvey: ApiSurveyType): SurveysType => {
  return {
    title: apiSurvey.title,
    city: apiSurvey.city,
    id: apiSurvey.id,
    description: apiSurvey.description,
    question1: apiSurvey.question1,
    answer1: apiSurvey.answer1,
    question2: apiSurvey.question2,
    answer2: apiSurvey.answer2,
    question3: apiSurvey.question3,
    answer3: apiSurvey.answer3,
    question4: apiSurvey.question4,
    answer4: apiSurvey.answer4,
    question5: apiSurvey.question5,
    answer5: apiSurvey.answer5,
    updated_at: apiSurvey.updated_at,
    end_date: apiSurvey.end_date,
    freeQuestion: apiSurvey.freeQuestion,
    image: apiSurvey.image,
    onlyFreeQuestion: apiSurvey.onlyFreeQuestion,
  };
};
