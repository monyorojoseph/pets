import React, {useEffect} from 'react'
import PetsContainer from '../../containers/PetsContainer'
import PageLoader from '../../components/PageLoader'
import { connect } from 'react-redux'
import { all_pets } from '../../actions/pet'

const AdoptionPets = ({pet, all_pets}) => {
  const { pets, loading } = pet
  useEffect(() => {
      all_pets("/pet/adopt-list-pets/")
  }, [])
  return loading ? (<PageLoader />) : (<PetsContainer pets={pets}/>)
}
const mapStateToProps = state => ({
  pet: state.pet
})
const mapDispatchToProps = {all_pets}

export default connect(mapStateToProps, mapDispatchToProps)(AdoptionPets)