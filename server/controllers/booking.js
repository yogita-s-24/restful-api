const postApiBookings =  async(req,res)=>{
    const {user,bus,contactNumber,seatNumber,date,isConfirmed,to,from} = req.body;

    try{
      const booking = new Booking ({
          user,
          bus,
          contactNumber,
          seatNumber,
          date,
          isConfirmed,
          to,
          from
      })
  
      const saveBookings = await booking.save();
  
      res.json({
          success:true,
          data:saveBookings,
          message:"Booking created successfully"
      })

    }catch(err){
      console.log('Error in saving booking');
    }
}

export {postApiBookings}