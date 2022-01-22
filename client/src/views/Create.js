import './Create.css';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoPrompt from '../components/InfoPrompt';
import { createNewVideogame, getAllVideogames, getGenres } from '../actions/actions';
import { nanoid } from 'nanoid';
// import { Link } from 'react-router-dom';

function Create() {
    const genres = useSelector(state => state.genres);
    const videogames = useSelector(state => state.videogames);
    const resultInfo = useSelector(state => state.resultInfo);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        rating: '',
        released: '',
        genres: [],
        platforms: [],
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        rating: '',
        released: '',
        genres: '',
        platforms: '',
    });
    const platforms = videogames.map(vg => vg.platforms).flat();
    // const UniquePlatforms = new Set(platforms)
    console.log(platforms);
    const [promptVisible, setPromptVisible] = useState(
        {
            visible: false,
            message: '',
            type: '',
            timeout: 0,
        }
    );
    let isGenreChecked, isPlatformChecked = false;

    function handleGenreOptionsChange(e) {
        let optionsErrors = '';
        if (!e) {
            document.getElementsByName('genreType').forEach((type) => {
                if (type.checked) isGenreChecked = true;
                return isGenreChecked;
            })

            if (!isGenreChecked) {
                optionsErrors = `At least one genre must be selected!`;
                setErrors({
                    ...errors,
                    genres: optionsErrors,
                });
                return optionsErrors;
            } else {
                optionsErrors = ``;
                setInputs({
                    ...inputs,
                    genres: [...inputs.genres],
                });
                return optionsErrors;
            }
        } else {
            console.log('e')
            const genreSelected = Number((e.target.id).replace('genre', ''));
            if (!(inputs.genres.includes(genreSelected))) {
                setInputs({
                    ...inputs,
                    genres: [...inputs.genres, genreSelected],
                });
                console.log('genres added')
            } else {
                const filteredCurrentGenres = inputs.genres.filter((genre) =>
                    genre !== genreSelected
                );
                setInputs({
                    ...inputs,
                    genres: [...filteredCurrentGenres],
                });
                console.log('genres removed')
            }

            document.getElementsByName('genreType').forEach((type) => {
                if (type.checked) isGenreChecked = true;
                return isGenreChecked;
            });

            if (!isGenreChecked) {
                errors.genres = `At least one genre must be selected!`;
                console.log('genres error')
            } else {
                errors.genres = ``;
                console.log('genres not error')
            }
        }
    }

    function handlePlatformOptionsChange(e) {
        let optionsErrors = {};
        if (!e) {
            document.getElementsByName('platformType').forEach((type) => {
                if (type.checked) isPlatformChecked = true;
                return isPlatformChecked;
            })

            if (!isPlatformChecked) {
                optionsErrors = `At least one platform must be selected!`;
                setErrors({
                    ...errors,
                    platforms: optionsErrors,
                });
                return optionsErrors;
            } else {
                optionsErrors = ``;
                setInputs({
                    ...inputs,
                    platforms: [...inputs.platforms],
                });
                return optionsErrors;
            }
        } else {
            const platformSelected = Number((e.target.id).replace('platform', ''));

            if (!(inputs.platforms.includes(platformSelected))) {
                setInputs({
                    ...inputs,
                    platforms: [...inputs.platforms, platformSelected],
                });
            } else {
                const filteredCurrentPlatforms = inputs.platforms.filter((platform) =>
                    platform !== platformSelected
                );
                setInputs({
                    ...inputs,
                    platforms: [...filteredCurrentPlatforms],
                });
            }

            document.getElementsByName('platformType').forEach((type) => {
                if (type.checked) isPlatformChecked = true;
                return isPlatformChecked;
            });

            if (!isPlatformChecked) {
                errors.platforms = `At least one platform must be selected!`;
            } else {
                errors.platforms = ``;
            }
        }
    }

    function validateInputs(e, inputsToValidate) {
        let validationErrors = { ...errors };
        const inputs = document.querySelectorAll('.form-input');
        if (!e) {
            document.querySelectorAll('.error-state').forEach(el =>
                el.classList.remove('error-state')
            );
            document.querySelectorAll('.okay-state').forEach(el =>
                el.classList.remove('okay-state')
            );
            inputs.forEach((input) => {
                const currInput = input.id;
                const currInputValue = input.value;
                const minInputValue = input?.min;
                const maxInputValue = input?.max;
                let capitalizedInput = currInput.charAt(0).toUpperCase() + currInput.slice(1);
                if (!currInputValue) {
                    addErrorStateToInput(input);
                    if (currInput === 'released') capitalizedInput = 'Release date';
                    validationErrors[currInput] = `${capitalizedInput} is required`;
                } else if (minInputValue && Number(currInputValue) < Number(minInputValue)) {
                    if (!input.nextElementSibling?.classList.contains('error-text')) {
                        addErrorStateToInput(input);
                        validationErrors[currInput] = `${capitalizedInput} value must be greater than ${Number(minInputValue)}`;
                    }
                } else if (maxInputValue && Number(currInputValue) > Number(maxInputValue)) {
                    if (!input.nextElementSibling?.classList.contains('error-text')) {
                        addErrorStateToInput(input);
                        validationErrors[currInput] = `${capitalizedInput} value must be lesser than ${Number(maxInputValue)}`;
                    }
                } else {
                    if (input.classList.contains('error-state')) {
                        input.classList.remove('error-state');
                        input.classList.add('okay-state');
                        validationErrors[currInput] = ``;
                    } else {
                        input.classList.add('okay-state');
                        validationErrors[currInput] = ``;
                    }
                }
            })
        } else {
            const input = e.target;
            const currInput = e.target.id
            const capitalizedInput = currInput.charAt(0).toUpperCase() + currInput.slice(1);
            const minInputValue = e.target?.min;
            const maxInputValue = e.target?.max;
            if (!inputsToValidate[currInput]) {
                console.log(currInput)
                addErrorStateToInput(input);
                validationErrors[currInput] = `${capitalizedInput} is required`;
            } else if (minInputValue && Number(inputsToValidate[currInput]) < Number(minInputValue)) {
                addErrorStateToInput(input);
                validationErrors[currInput] = `${capitalizedInput} value must be greater than ${Number(minInputValue)}`;
            } else if (maxInputValue && Number(inputsToValidate[currInput]) > Number(maxInputValue)) {
                addErrorStateToInput(input);
                validationErrors[currInput] = `${capitalizedInput} value must be lesser than ${Number(maxInputValue)}`;
            } else {
                if (input.classList.contains('error-state')) {
                    input.classList.remove('error-state');
                    input.classList.add('okay-state');
                    validationErrors[currInput] = ``;
                } else {
                    input.classList.add('okay-state');
                    validationErrors[currInput] = ``;
                }
            }
        }
        if (Object.entries(validationErrors).length) {
            const genresResults = handleGenreOptionsChange();
            const platformsResults = handlePlatformOptionsChange();
            if (!e && (Object.entries(genresResults).length || Object.entries(platformsResults).length)) {
                validationErrors.genres = genresResults;
                validationErrors.platforms = platformsResults;
            }
            console.log(validationErrors)
            return validationErrors;
        } else return validationErrors;
    }

    function handleInputs(e) {
        const currInput = e.target.id;
        const currInputValue = e.target.value;

        setInputs({
            ...inputs,
            [currInput]: currInputValue
        });
        const validationResults = validateInputs(e, {
            ...inputs,
            [currInput]: currInputValue
        });
        setErrors(
            validationResults
        );
    }

    function addErrorStateToInput(input) {
        if (input.classList.contains('okay-state')) {
            input.classList.remove('okay-state');
            input.classList.add('error-state');
        } else {
            input.classList.add('error-state');
        }
    }

    function createVideogame(e) {
        e.preventDefault();
        const results = validateInputs();
        // const genresResults = handleGenreOptionsChange();
        // const platformsResults = handlePlatformOptionsChange();
        const noErrorsInResults = Object.entries(results).every(r => r[1] === '');
        if (noErrorsInResults) {
            console.log('good');
            if (inputs.platforms.length && inputs.genres.length)
                dispatch(createNewVideogame(inputs));
            else
                console.log('missing data');
        } else {
            console.log('error in some inputs');
            setErrors(validateInputs());
        }
    }

    function resetInputs() {
        setInputs({
            name: '',
            description: '',
            rating: '',
            released: '',
            genres: [],
            platforms: [],
        });
        document.querySelectorAll('.okay-state').forEach(el =>
            el.classList.remove('okay-state')
        );
    }

    useEffect(
        () => {
            if (resultInfo.length) {
                setPromptVisible({
                    visible: true,
                    message: resultInfo,
                    type: 'info',
                    timeout: 5000,
                });
                resetInputs();
                setTimeout(() => {
                    setPromptVisible({ visible: false });
                }, 5000);
            }
        },
        [resultInfo],
    )

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getAllVideogames());
    }, [dispatch])

    return (
        <main>
            <section className="create">
                <form className='new-videogame-form'
                    onSubmit={(e) => createVideogame(e)}
                >
                    <fieldset
                        className='new-videogame-form__inputs section'>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="form__input" className='form-input' id="name" value={inputs.name} onChange={handleInputs} />
                        </div>
                        {errors.name && (<p className='error-text'>{errors.name}</p>)}

                        <div>
                            <label htmlFor="description" id='description'>Description: </label>
                            <textarea name="form_input"
                                className='form-input'
                                id="description" cols='60' rows='3' value={inputs.description} maxLength='500'
                                onChange={handleInputs}

                            />
                        </div>
                        {errors.description && (<p className='error-text'>{errors.description}</p>)}

                        <div>
                            <label htmlFor="rating">Rating: </label>
                            <input type="number"
                                className='form-input'
                                name="form_input"
                                id="rating" value={inputs.rating} min='1' max='5' step='0.1' onChange={handleInputs}
                            />
                        </div>
                        {errors.rating && (<p className='error-text'>{errors.rating}</p>)}

                        <div>
                            <label htmlFor="released">Release date: </label>
                            <input type="date" name="form_input"
                                className='form-input'
                                id="released"
                                value={inputs.released}
                                onChange={handleInputs}
                            />
                        </div>
                        {errors.released && (<p className='error-text'>{errors.released}</p>)}
                    </fieldset>
                    <fieldset className='new-videogame-form__genres'>
                        <legend>Genres: </legend>
                        <h5>Select at least one genre for your videogame</h5>
                        <section className='new-videogame-form__genre-options'>
                            {Array.isArray(genres) && genres.length
                                ? genres.map((genre, i) => {
                                    return (
                                        <div key={genre.id}>
                                            <input
                                                type='checkbox'
                                                name='genreType'
                                                id={`genre${genre.id}`}
                                                onChange={(e) => handleGenreOptionsChange(e)}
                                                checked={inputs.genres.includes(genre.id)}
                                            ></input>
                                            <label htmlFor={`genre${genre.id}`}>
                                                {genre.name}
                                            </label>
                                        </div>
                                    )
                                })
                                : genres}
                        </section>
                        {errors.genres && (
                            <div className='error-text' style={{ alignSelf: 'flex-start' }}>
                                {errors.genres}
                            </div>
                        )}
                    </fieldset>
                    {/* <fieldset className='new-videogame-form__platforms'>
                        <legend>Platforms: </legend>
                        <h5>*At least one platform is required</h5>
                        <div className='new-videogame-form__platforms-options'>
                            {Array.isArray(platforms) && platforms.length
                                ? platforms.map((platform, i) => {
                                    return (
                                        <div key={nanoid(10)}>
                                            <input
                                                type='checkbox'
                                                name='platformType'
                                                id={`platform${i + 1}`}
                                                onChange={(e) => handlePlatformOptionsChange(e)}
                                                checked={inputs.platforms.includes(i + 1)}
                                            ></input>
                                            <label htmlFor={`platform${i + 1}`}>
                                                {platform}
                                            </label>
                                        </div>
                                    )
                                })
                                : platforms}
                        </div>
                        {errors.platforms && (
                            <div className='error-text' style={{ alignSelf: 'flex-start' }}>
                                {errors.platforms}
                            </div>
                        )}
                    </fieldset> */}
                    <button type="submit" className='create-btn'>
                        <span>Create videogame</span>
                        <svg className="svg-circleplus" viewBox="0 0 100 100" height="34">
                            <circle cx="50" cy="50" r="45" fill="none" strokeWidth="7.5" stroke="white"></circle>
                            <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5" stroke="white"></line>
                            <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5" stroke="white"></line>
                        </svg>
                    </button>
                </form>
            </section>
            {promptVisible.visible && <InfoPrompt
                visible={promptVisible.visible}
                type={promptVisible.type}
                message={promptVisible.message}
                timeout={promptVisible.timeout}
            />}
        </main>
    );
}

export default Create;