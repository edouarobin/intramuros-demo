// @flow

import React, { PureComponent } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { GoBackButton, Loader, MyFastImage } from 'Intramuros/src/components'
import globalStyle, { BIG_SCREEN_PADDING_OFFSET } from 'Intramuros/src/style/globalStyle'
import request from 'superagent'
import ENV from 'Intramuros/src/environment'
import { split, forEach } from 'lodash'
import styles from '../Services/components/ReportPage.style'
import { formatDate3 } from 'Intramuros/src/services/FormatDate'
import addDays from 'date-fns/add_days'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { _calculateEndingSurvey } from '../../components/molecules/SurveyCard'
import { getUserIdToken } from './../../redux/utils';
import SurveyDetailResult from '../SurveyDetailResult/SurveyDetailResult.component'
import { myFirebase } from '../../redux/utils'
import { oneSurveyNormalizer } from '../../redux/surveys/normalizer'
import { isInProgress } from '../../redux/surveys/selectors'
import { size } from 'lodash'

type PropsType = {
    navigation: NavigationPropsType<>,
    survey: SurveysType,
    saveAnsweredSurveyId: (id: number) => void,
    isNotification: boolean,
    surveyID: number,
};

type StateType = {
    token: string,
    surveyResultId: number,
    surveyResultFetched: boolean,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    answer5: string,
    freeAnswer: string,
    surveyIsSending: boolean,
    surveyFetched: boolean,
    surveyDetails: any,
    fetchSurveyError: boolean,
};

export default class SurveyDetail extends PureComponent<PropsType, StateType> {

    state = {
        token: getUserIdToken() ? getUserIdToken() : null,
        surveyResultId: null,
        surveyResultFetched: false,
        answer1: null,
        answer2: null,
        answer3: null,
        answer4: null,
        answer5: null,
        freeAnswer: "",
        surveyIsSending: false,
        surveyFetched: false,
        surveyDetails: this.props.survey ? this.props.survey : {},
        fetchSurveyError: false,
    };

    _defaultAnswer(anwsers: string) {
        options = split(anwsers, '/')
        return options[0]
    }

    componentDidMount() {
        if (this.state.token === null) {
            console.log('token uid is null, get a new one.')
            myFirebase.auth().signInAnonymously().then(() => {
                const token = myFirebase.auth().currentUser.uid
                this.setState({ token: token })
            })
        }
    }

    _updateStateWithSurveyresult = (surveyResult: any) => {
        if (surveyResult) {
            this.setState({
                surveyResultId: surveyResult.id,
                surveyResultFetched: true,
                answer1: surveyResult.answer1,
                answer2: surveyResult.answer2,
                answer3: surveyResult.answer3,
                answer4: surveyResult.answer4,
                answer5: surveyResult.answer5,
                freeAnswer: surveyResult.freeAnswer
            })
        } else {
            console.log("pas encore répondu au sondage.")
            this.setState({
                surveyResultFetched: true
            })
        }
    }

    _getSurveyResult = (survey: any, token: string) => {
        if (survey && survey.id) {
            request.get(`${ENV.API_URL}/services/surveyresults/?survey-id=` + survey.id + `&token=` + token)
                .then(response => response.body)
                .then(surveyResult => this._updateStateWithSurveyresult(surveyResult[0]))
                .catch(error => {
                    console.log("ERROR during fetch survey result call : " + error)
                    this.setState({
                        surveyResultFetched: true
                    })
                });
        } else {
            console.log("error: survey id is null !")
        }
    }

    _refreshStateFromSurveyResult = (responseBody: any) => {
        if (responseBody) {
            try {
                //Sauvegarde en mémoire de l'id du sondage, pour qu'on sache que l'utilisateur a déja voté.
                this.props.saveAnsweredSurveyId(responseBody.survey)
            } catch (err) {
                console.log(err)
            }

            this.setState({
                surveyResultId: responseBody.id,
                answer1: responseBody.answer1,
                answer2: responseBody.answer2,
                answer3: responseBody.answer3,
                answer4: responseBody.answer4,
                answer5: responseBody.answer5,
                freeAnswer: responseBody.freeAnswer
            })
        }
    }

    _alert = (title: string, message: string, callback: any) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: callback },],
            { cancelable: false }
        );
    }

    _alertGoResults = (title: string, message: string, callback: any) => {
        Alert.alert(
            title,
            message,
            [{ text: 'Oui', onPress: callback }, { text: 'Non', onPress: () => this.props.navigation.goBack() }],
            { cancelable: false }
        );
    }

    _successMessage = () => {
        if (this.state.surveyDetails.onlyFreeQuestion) {
            return "Votre vote a bien été enregistré. Vous pouvez le modifier jusqu'au " + formatDate3(this.state.surveyDetails.end_date)
        } else if (this.state.surveyDetails.inProgress) {
            return 'Votre vote a bien été enregistré. Voulez-vous voir les résultats provisoires ?'
        }
        return 'Votre vote a bien été enregistré. Vous pourrez consulter les résultats du sondage à partir du ' + formatDate3(addDays(this.state.surveyDetails.end_date, 1))
    }

    _errorSending = () => {
        this.setState({ surveyIsSending: false })
    }

    _successSending = () => {
        this.setState({ surveyIsSending: false })
        this.props.navigation.goBack()
    }

    _sendSurveyResponse = () => {
        this.setState({ surveyIsSending: true })
        let postForm = request.post(`${ENV.API_URL}/services/surveyresults/`);
        if (this.state.surveyResultId) {
            postForm = request.patch(`${ENV.API_URL}/services/surveyresults/` + this.state.surveyResultId + '/');
            if (this.state.answer1) { postForm.field('answer1', this.state.answer1) }
            if (this.state.answer2) { postForm.field('answer2', this.state.answer2) }
            if (this.state.answer3) { postForm.field('answer3', this.state.answer3) }
            if (this.state.answer4) { postForm.field('answer4', this.state.answer4) }
            if (this.state.answer5) { postForm.field('answer5', this.state.answer5) }
        } else {
            postForm
                .field('survey', this.state.surveyDetails.id)
                .field('answer1', this.state.answer1 ? this.state.answer1 : "")
                .field('answer2', this.state.answer2 ? this.state.answer2 : "")
                .field('answer3', this.state.answer3 ? this.state.answer3 : "")
                .field('answer4', this.state.answer4 ? this.state.answer4 : "")
                .field('answer5', this.state.answer5 ? this.state.answer5 : "")
        }
        postForm
            .field('freeAnswer', this.state.freeAnswer ? this.state.freeAnswer : "")
            .field('token', this.state.token)
            .then((response) => {
                if (response) {
                    this._refreshStateFromSurveyResult(response.body)
                }
                if (this.state.surveyDetails.inProgress && !this.state.surveyDetails.onlyFreeQuestion) {
                    this._alertGoResults('Merci !', this._successMessage(), () => this.props.navigation.replace('SurveyDetailResult', { survey: this.state.surveyDetails }))
                } else {
                    this._alert('Merci !', this._successMessage(), () => this._successSending())
                }
            }).catch((error) => {
                let response = error ? error.response : null;
                if (response && response.statusCode) {
                    if (response.statusCode === 429) {
                        this._alert('Envoi bloqué !', "Pour des raisons de sécurité vous ne pouvez pas voter plus de 30 fois par heure. Nous vous invitons a réessayer dans 1h maximum.", () => this._errorSending())
                    } else {
                        this._alert("Echec d'envoi (erreur " + response.statusCode + ")", "Veuillez essayer à nouveau. Si le problème persiste, vérifiez votre connexion internet ou contactez le support IntraMuros (assistance@appli-intramuros.fr) en précisant le code d'erreur.", () => this._errorSending())
                    }
                } else {
                    this._alert("Impossible d'envoyer votre réponse", "Veuillez essayer à nouveau. Si le problème persiste, vérifiez votre connexion internet ou contactez le support IntraMuros (assistance@appli-intramuros.fr).", () => this._errorSending())
                }
            }
            );
    }

    _computeRadioProps = (answers: string) => {
        let radio_props = []
        if (answers) {
            options = split(answers, '/')
            let i = 0
            forEach(options, (option) => {
                let radioProp = {
                    label: option,
                    value: i
                }
                i++
                radio_props.push(radioProp)
            })
        }
        return radio_props
    }

    _fetchSurvey = (id: number) => {
        try {
            request.get(`${ENV.API_URL}/services/survey/` + id + `/`)
                .then(response => response.body)
                .then(survey => {
                    const surveyNormalized = oneSurveyNormalizer(survey).entities.survey[id]
                    surveyNormalized.inProgress = isInProgress(surveyNormalized)
                    this.setState({
                        surveyFetched: true,
                        surveyDetails: surveyNormalized
                    })
                })
                .catch(error => {
                    console.log("ERROR during fetch survey from notification : " + error)
                    this.setState({
                        surveyFetched: true,
                        fetchSurveyError: true
                    })
                });
        } catch (error) {
            console.log("Error trying to fetch survey detail: " + error)
            this.setState({
                surveyFetched: true,
                fetchSurveyError: true
            })
        }
    }

    _renderResultNotAvailable = () => {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content"
                    backgroundColor='transparent'
                    translucent
                    animated={true}
                />
                <ScrollView>
                    <GoBackButton
                        navigation={this.props.navigation}
                        color="black"
                    />
                    <Text
                        style={{
                            marginTop: 30,
                            marginBottom: 16,
                            height: 20,
                            fontSize: 15,
                            fontFamily: 'Lato-Regular',
                            color: globalStyle.colors.darkerGrey,
                            textAlign: 'center'
                        }}>
                        {"Les résultats du sondage ne sont pas disponibles."}
                    </Text>
                </ScrollView>
            </View>
        )
    }

    _render404 = () => {
        Alert.alert(
            'Oups !',
            "Un problème est survenu lors de la récupération du sondage.",
            [
                { text: 'Ok', onPress: () => this.props.navigation.goBack() }
            ],
            {
                cancelable: false,
            }
        );
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content"
                    backgroundColor='transparent'
                    translucent
                    animated={true}
                />
                <ScrollView>
                    <GoBackButton
                        navigation={this.props.navigation}
                        color="black"
                    />
                </ScrollView>
            </View>
        )
    }

    _renderLoading = () => {
        //Need to wait
        return (
            <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
                <StatusBar barStyle="dark-content"
                    backgroundColor='transparent'
                    translucent
                    animated={true}
                />
                <ScrollView>
                    <GoBackButton
                        navigation={this.props.navigation}
                        color="black"
                    />
                    <Loader
                        isLoading={true}
                        message="Chargement en cours"
                        fullpage={true}
                    />
                </ScrollView>
            </View>
        )
    }

    render() {
        let { surveyID, isNotification } = this.props

        if (isNotification) {
            //Go fetch survey details
            if (!this.state.surveyFetched) {
                this._fetchSurvey(surveyID)
                return this._renderLoading()
            } else {
                if (this.state.fetchSurveyError || size(this.state.surveyDetails) < 1) {
                    return this._render404()
                }
            }
        } else {
            if (size(this.state.surveyDetails) < 1) {
                return this._render404()
            }
        }

        //Si le sondage est terminé et que ce n'est pas seulement une question ouverte. On affiche les résultats
        if (this.state.surveyDetails && this.state.surveyDetails.id && !this.state.surveyDetails.inProgress) {
            if (this.state.surveyDetails.onlyFreeQuestion) {
                return this._renderResultNotAvailable()
            } else {
                console.log("Le sondage est terminé, on affiche le résulat uniquement")
                return (<SurveyDetailResult survey={this.state.surveyDetails} navigation={this.props.navigation} />)
            }

        }

        if (this.state.surveyDetails && !this.state.surveyResultFetched && this.state.token !== null) {
            console.log("go to call result survey api for survey id = " + this.state.surveyDetails.id + " and token = " + this.state.token)
            this._getSurveyResult(this.state.surveyDetails, this.state.token)
        }

        let radio_props1 = this._computeRadioProps(this.state.surveyDetails.answer1)
        let radio_props2 = this._computeRadioProps(this.state.surveyDetails.answer2)
        let radio_props3 = this._computeRadioProps(this.state.surveyDetails.answer3)
        let radio_props4 = this._computeRadioProps(this.state.surveyDetails.answer4)
        let radio_props5 = this._computeRadioProps(this.state.surveyDetails.answer5)

        return (
            <View style={{ flex: 1, backgroundColor: globalStyle.colors.lightGrey }}>
                <StatusBar barStyle="dark-content"
                    backgroundColor='transparent'
                    translucent
                    animated={true}
                />
                <ScrollView>
                    <GoBackButton
                        navigation={this.props.navigation}
                        color="black"
                    />
                    {
                        !this.state.surveyResultFetched ? (
                            <Loader
                                isLoading={true}
                                message="Chargement en cours"
                                fullpage={true}
                            />
                        ) : (
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                        padding: 16,
                                        paddingHorizontal: 16 + BIG_SCREEN_PADDING_OFFSET,
                                    }}
                                >
                                    <Text style={{ textAlign: "center", fontSize: 20, fontFamily: 'Lato-Bold', width: '100%' }}>{this.state.surveyDetails.title}</Text>
                                    <Text style={{ textAlign: "center", fontSize: 15, fontFamily: 'Lato-Italic', width: '100%', color: '#868686', marginTop: 5 }}>{"Fin du vote "}{_calculateEndingSurvey(this.state.surveyDetails.end_date)}</Text>
                                    {this.state.surveyDetails.image ? (
                                        <MyFastImage
                                            style={{
                                                height: 250,
                                                width: '100%',
                                                marginTop: 15,
                                            }}
                                            source={{
                                                uri: this.state.surveyDetails.image,
                                                priority: 'normal',
                                            }}
                                            localImage
                                            resizeMode={'contain'}
                                        />
                                    ) : null}


                                    {this.state.surveyDetails.description ? (
                                        <Text style={{ marginTop: 20, fontSize: 14, fontFamily: 'Lato-Regular' }} selectable={true} >{this.state.surveyDetails.description}</Text>
                                    ) : null}
                                    {this.state.surveyDetails.question1 ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.question1}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.answer1 && radio_props1 ? (
                                        radio_props1.map(button => {
                                            let isSelected = this.state.answer1 === button.label
                                            return (
                                                <View key={button.value} style={{ width: '100%' }}>
                                                    <TouchableOpacity
                                                        style={[myStyles.button, isSelected ? myStyles.selectedButton : null]}
                                                        onPress={() => this.setState({ answer1: button.label })}
                                                    >
                                                        <Text style={[myStyles.textButton, isSelected ? myStyles.textButtonSelected : null]} selectable={true} >{button.label}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })

                                    ) : null}
                                    {this.state.surveyDetails.question2 ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.question2}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.answer2 && radio_props2 ? (
                                        radio_props2.map(button => {
                                            let isSelected = this.state.answer2 === button.label
                                            return (
                                                <View key={button.value} style={{ width: '100%' }}>
                                                    <TouchableOpacity
                                                        style={[myStyles.button, isSelected ? myStyles.selectedButton : null]}
                                                        onPress={() => this.setState({ answer2: button.label })}
                                                    >
                                                        <Text style={[myStyles.textButton, isSelected ? myStyles.textButtonSelected : null]} selectable={true} >{button.label}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })

                                    ) : null}
                                    {this.state.surveyDetails.question3 ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.question3}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.answer3 && radio_props3 ? (
                                        radio_props3.map(button => {
                                            let isSelected = this.state.answer3 === button.label
                                            return (
                                                <View key={button.value} style={{ width: '100%' }}>
                                                    <TouchableOpacity
                                                        style={[myStyles.button, isSelected ? myStyles.selectedButton : null]}
                                                        onPress={() => this.setState({ answer3: button.label })}
                                                    >
                                                        <Text style={[myStyles.textButton, isSelected ? myStyles.textButtonSelected : null]} selectable={true} >{button.label}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })

                                    ) : null}
                                    {this.state.surveyDetails.question4 ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.question4}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.answer4 && radio_props4 ? (
                                        radio_props4.map(button => {
                                            let isSelected = this.state.answer4 === button.label
                                            return (
                                                <View key={button.value} style={{ width: '100%' }}>
                                                    <TouchableOpacity
                                                        style={[myStyles.button, isSelected ? myStyles.selectedButton : null]}
                                                        onPress={() => this.setState({ answer4: button.label })}
                                                    >
                                                        <Text style={[myStyles.textButton, isSelected ? myStyles.textButtonSelected : null]} selectable={true} >{button.label}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })

                                    ) : null}
                                    {this.state.surveyDetails.question5 ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.question5}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.answer5 && radio_props5 ? (
                                        radio_props5.map(button => {
                                            let isSelected = this.state.answer5 === button.label
                                            return (
                                                <View key={button.value} style={{ width: '100%' }}>
                                                    <TouchableOpacity
                                                        style={[myStyles.button, isSelected ? myStyles.selectedButton : null]}
                                                        onPress={() => this.setState({ answer5: button.label })}
                                                    >
                                                        <Text style={[myStyles.textButton, isSelected ? myStyles.textButtonSelected : null]} selectable={true} >{button.label}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })

                                    ) : null}
                                    {this.state.surveyDetails.freeQuestion ? (
                                        <View style={{ width: '100%' }}>
                                            <Text style={{ textAlign: 'center', width: '100%', fontSize: 16, fontFamily: 'Lato-Bold', marginVertical: 20 }} selectable={true} >{this.state.surveyDetails.freeQuestion}</Text>
                                        </View>
                                    ) : null}
                                    {this.state.surveyDetails.freeQuestion ? (
                                        <TextInput
                                            autoCorrect={true}
                                            style={{
                                                fontSize: 15,
                                                fontFamily: 'Lato-Italic',
                                                lineHeight: 20,
                                                borderWidth: 1,
                                                borderColor: '#E9E9E9',
                                                flexWrap: 'wrap',
                                                padding: 10,
                                                width: '100%',
                                                textAlign: 'left',
                                                color: '#727272',
                                                height: 100,
                                            }}
                                            multiline
                                            onChangeText={(freeAnswer) => this.setState({ freeAnswer })}
                                            placeholder="Votre réponse ..."
                                            maxLength={500}
                                            numberOfLines={8}
                                            defaultValue={this.state.freeAnswer ? this.state.freeAnswer : null}
                                        />
                                    ) : null}
                                    <View style={{
                                        width: '100%',
                                        alignItems: 'center',
                                        marginTop: 15,
                                    }}>
                                        <TouchableOpacity
                                            style={styles.submitButton}
                                            onPress={() => this._sendSurveyResponse()}
                                            disabled={this.state.surveyIsSending}
                                        >
                                            {this.state.surveyIsSending ? (
                                                <ActivityIndicator animating size="small" color="white" />
                                            ) : (
                                                    <Text style={styles.submitText}>
                                                        {this.state.surveyResultId ? 'Mettre à jour' : 'Valider'}
                                                    </Text>
                                                )}
                                        </TouchableOpacity>
                                        <KeyboardSpacer />
                                    </View>
                                </View>
                            )
                    }
                </ScrollView>
            </View >

        );
    }
}

const myStyles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: '#E9E9E9',
    },
    selectedButton: {
        backgroundColor: '#2196F3',
    },
    textButton: {
        textAlign: 'center',
        width: '100%',
        fontSize: 15,
        fontFamily: 'Lato-Regular',
        marginVertical: 10,
        color: 'black'
    },
    textButtonSelected: {
        color: 'white'
    }
})
