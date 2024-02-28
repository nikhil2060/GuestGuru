import supabase from "./supabase";

const supabaseURL = "https://ntggwdmclhkaictxucrn.supabase.co";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseURL);
  // https://ntggwdmclhkaictxucrn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;
  // Supabase makes folder if / is present in Path hence replacing all / by ""

  //1. create cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //For Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete Cabin if error occured on uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created./"
    );
  }

  return data;
}
