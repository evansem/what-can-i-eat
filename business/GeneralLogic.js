
/**
 * Given a list of parameters check that they are all well defined
 */
export const requires = (list) => {
    list.forEach(element => {
        if (!!element) {
            return "Ensure all fields have been filled"
        }
    });
    return null
}