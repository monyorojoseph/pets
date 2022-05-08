import React, {useEffect} from 'react'
import PetsContainer from '../../containers/PetsContainer'
import PageLoader from '../../components/PageLoader'
import { connect } from 'react-redux'
import { all_pets } from '../../actions/pet'

const AllPets = ({all_pets, pet}) => {
    const { pets, loading } = pet
    useEffect(() => {
        all_pets("/pet/list-pets/")
    }, [])
    return loading ? (<PageLoader />) : (<PetsContainer pets={pets}/>)
}
const mapStateToProps = state => ({
    pet: state.pet
})

const mapDispatchToProps = {all_pets}

export default connect(mapStateToProps, mapDispatchToProps)(AllPets)